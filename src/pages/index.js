import React, { Component } from 'react';
import { Button, Tag, NavBar, Icon, InputItem, SearchBar, Result, Flex } from 'antd-mobile';
import { Input, Select } from 'antd';
import Sortable from 'react-sortablejs';
import _ from 'loadsh';
import classNames from 'classnames';
import { indexToArray, UpdateItem, isPathorCom, getDragItem, itemAdd, itemRemove, findItemObject, itemUpdateInfo } from '../utils/utils';
import styles from './home.less'
import componetList from './config';
import Color from './picker';

const GlobalComponent = {
  Button,
  Tag,
  NavBar,
  Icon,
  InputItem,
  SearchBar,
  Result
};

const comOption = {
  group: {
    name: 'formItem',
    pull: 'clone',
    put: false,
  },
  sort: false,
};
const sortableOption = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  group: {
    name: 'formItem',
    pull: true,
    put: true,
  },
};
const comData = [
  {
    type: 'div',
    nested: true,
    props: {
      style: {
        border: '1px solid red',
      },
    },
    children: []
  },
];

class Home extends Component {
  state = {
    viewData: [],
    ComListHidden: false,
    info: {},
    dragItem: {},
    arrIndex: '',
    info2: [],
    reactNodeInfo: {},
    reactNodeConfig: [],
    color: '#6b3232'
  };

  componentDidMount() {
    this.setState({
      viewData: comData,
    });
  }

  // 拖拽的排序方法,同级拖拽通过update
  onUpdate = evt => {
    // 交换数组
    const { newIndex, oldIndex } = evt;
    // 父节点路径
    const parentPath = evt.path[1].getAttribute('data-id');
    const oldData = _.cloneDeep(this.state.viewData);
    const newData = UpdateItem(newIndex, oldIndex, oldData, parentPath);
    this.setState({
      viewData: newData
    })
  }

  onAddItem = evt => {
    const startIndex = evt.newDraggableIndex;
    const comNameOrPath = evt.clone.dataset.id; // (1)得到拖拽元素或者路径
    const parentPath = evt.path[1].getAttribute('data-id');
    const newIndex = parentPath ? `${parentPath}-${startIndex}` : startIndex;
    const oldData = _.cloneDeep(this.state.viewData);
    if(isPathorCom(comNameOrPath)) {
      // 跨级拖拽, 需要考虑先删除元素还是先添加元素
      const oldIndex = comNameOrPath;
      const dragItem = getDragItem(oldIndex, oldData);
      if( indexToArray(oldIndex) < indexToArray(newIndex)){
        // 先加后删
        let newTreeData = itemAdd(newIndex, oldData, dragItem);
        let newTreeData2 = itemRemove(oldIndex, newTreeData);
        this.setState({
          viewData: newTreeData2
        })
        return ;
      }
      // 先删后加
      let newData = itemRemove(oldIndex, oldData);
      newData = itemAdd(newIndex, newData, dragItem);
      this.setState({
        viewData: newData
      })
      return ;
    }
    const componetFromList = findItemObject(componetList, comNameOrPath);
    const newData = itemAdd(newIndex, oldData, componetFromList);
    this.setState({
      viewData: newData
    })
  }


  /**
   * @description 点击时把config，info等属性保存到state里。
   */
  onChoose = (evt) => {
    let parent = evt.target;
    while(parent.getAttribute('data-id') == null) {
      parent = parent.parentNode;
    }
    const arrIndex = evt.target.getAttribute('data-id') || parent.getAttribute('data-id');
    const dragItem = getDragItem(arrIndex,_.clone(this.state.viewData));
    let info = {} , reactNodeInfo = {};
    info = dragItem.props;
    reactNodeInfo = dragItem.nodeProps;
    const componetFromList = findItemObject(componetList, dragItem.type);
    const config  =  componetFromList.config;
    const reactNodeConfig = componetFromList.reactNodeConfig;
    this.setState({
      info, dragItem, arrIndex, info2: config, reactNodeInfo, reactNodeConfig
    })
  }

  renderComp(data) {
    return data.map(item => {
      return (
        <div data-id={item.type} key={_.uniqueId()}>
          <Tag>{item.title}</Tag>
        </div>
      );
    });
  }

  renderView = (data, index) => {
    return data.map((item, i) => {
      // index
      const indexs = index === '' ? String(i) : `${index}-${i}`;
      // 渲染，有子元素的嵌套的
      if (item.children) {
        let { props: style = {} } = item;
        let draggable = {
            border: '1px dashed black',
        };
        let mergestyle = Object.assign({}, style.style, draggable)
        return (
          <div style={mergestyle} data-id={indexs} key={_.uniqueId()} >
            <Sortable
              style={{
                minHeight: 50,
                margin: 10,
              }}
              key={_.uniqueId()}
              ref={c => c && (this.sortable = c.sortable)}
              options={{
                ...sortableOption,
                onAdd: evt => this.onAddItem(evt),
                onUpdate: evt => this.onUpdate(evt),
              }}
            >
              {item.children.length > 0 ? this.renderView(item.children, indexs) : null}
            </Sortable>
          </div>
        );
      }
      const Comp = GlobalComponent[item.type];
      // 具有特殊属性(ReactNode)
      let ReactNodeProps = {};
      if(item.nodeProps) {
        const nodeProps = item.nodeProps;
        for(const key in nodeProps) {
          const func = nodeProps[key].renderFunc;
          const params = nodeProps[key].params;
          ReactNodeProps[key] = func(params);
        }
      }
      const props = {
        'data-id': indexs,
        ...item.props,
        ...ReactNodeProps
      }
      if(item.needDiv == true) {
        return <div data-id={indexs} style={{ border: '1px dashed blue'}}>{React.createElement(Comp, props, item.props.content ? item.props.content : null)}</div>;
      } else {
        return React.createElement(Comp, props, item.props.content ? item.props.content : null)
      }
    });
  };

  /**
   * @description 左边切换的事件，是否显示componentList
   */
  toggleComponentList = () => {
    const { ComListHidden } = this.state;
    this.setState({
      ComListHidden: !ComListHidden
    })
  }

  /**
   * @description 配置项的渲染组件
   * @param {*} data 该配置项的数据结构
   */
  renderConfig = (data, type) => {
    if(JSON.stringify(data) !== '[]' && data) {
      return data.map((item) => {
        return (
          <div>
            <div><h3>{item.text}</h3></div>
            <div>{
              item.children.map(item => {
                return (
                  <div>
                    {this.renderValue(item, type)}
                  </div>
                )
              })
            }</div>
          </div>
        )
      })
    }
  }

  /**
   * @description 改变input配置项触发的函数(props)
   * @param {e} e event触发得到的e
   * @param {string} key 所对应到的属性名称 e.g:props.content -> content
   */
  changeValue = (targetValue, key) => {
    const { info, dragItem, arrIndex } = this.state;
    let data = _.cloneDeep(info);
    let configInfo = data;
    if(key.indexOf('.') != -1) {
      const keyarr = key.split('.');
      keyarr.map((item, index) => {
        if(index == keyarr.length -1) {
          configInfo[item] = targetValue;
        } else {
          configInfo = configInfo[item];
        }
      })
    } else {
      configInfo[key] = targetValue;
    }
    this.setState({
      info: data
    })
    dragItem.props = data;
    const newdata = itemUpdateInfo(arrIndex, _.cloneDeep(this.state.viewData), dragItem);
    this.setState({
      viewData: newdata
    })
  }

  /**
   * @description 改变input配置项触发的函数(nodeProps)
   * @param {e} e event触发得到的e
   * @param {string} key 所对应到的属性名称 e.g:props.content -> content
   */
  changeReactNodeValue = (targetValue, key) => {
    // set reactinfo的key， 修改reactnode的key
    const { reactNodeInfo, dragItem, arrIndex } = this.state;
    let data = _.cloneDeep(reactNodeInfo);
    let configInfo = data;
    // 分解key
    const valuearr = key.split('.');
    const objkey = valuearr[0];
    const params = valuearr[1];
    // 赋值给config里对应的key
    configInfo[objkey].params[params] = targetValue;
    this.setState({
      reactNodeInfo: data
    })
    // 对应渲染到页面上
    dragItem.nodeProps = data;
    const newdata = itemUpdateInfo(arrIndex, _.cloneDeep(this.state.viewData), dragItem);
    this.setState({
      viewData: newdata
    })
  }

  /**
   * @description change事件
   * @param {string} type 对应类型['props','reactNodeProps']
   * @param {string} key 所对应到的属性名称 e.g:props.content -> content
   */
  changeValueParent = (type, targetValue, key) => {
    if(type === 'props') {
      return this.changeValue(targetValue, key);
    }
    if(type === 'reactNodeProps') {
      return this.changeReactNodeValue(targetValue, key);
    }
  }

  /**
   * @description render函数，渲染配置项
   */
  renderValue = ({text: title, field: value, type, data}, propsType) => {
    let valueInfo = propsType === 'props' ? this.state.info: this.state.reactNodeInfo;
    if( propsType === 'props') {
      if(value.indexOf('.') != -1) {
        const valuearr = value.split('.');
        valuearr.map((item, index) => {
          if(index == valuearr.length -1) {
            valueInfo = valueInfo[item];
          } else {
            valueInfo = valueInfo[item];
          }
        })
      } else {
        valueInfo = valueInfo[value];
      }
    } else {
      // reactnodeinofo; 
      // 特殊处理,key,只有.的参数
      const valuearr = value.split('.');
      const key = valuearr[0];
      const params = valuearr[1];
      valueInfo = valueInfo[key].params[params];
    }
    if (type === 'string') {
      return <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span >{title}</span>
        <Input value={valueInfo}  style={{ width: '50%' }} onChange={(e) =>this.changeValueParent(propsType, e.target.value, value)} />
      </div>;
    }
    if (type === 'array') {
      return <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span >{title}</span>
          <Select
            defaultValue={valueInfo}
            style={{ width: '50%' }}
            onChange={(v)=>{
              this.changeValueParent(propsType, v, value)
            }}
            >
            {
              data.map((item) => {
                return <Select.Option value={item.value}>{item.text}</Select.Option>
              })
            }
            </Select>
        </div>;
    }
    if(type === 'color') {
      return <div style={{display: 'flex'}}>
      <span >{title}</span>
      <Color color={valueInfo}  style={{ width: '50%' }} onChange={(color) =>this.changeValueParent(propsType, color, value)} />
    </div>;
    }
    return <div >other</div>;
  }

  changeHandler = (c) => {
    this.setState({
      color: c,
    })
  }

  render() {

    var cls = classNames(styles.ComponentList, {
      [styles.hidden]: this.state.ComListHidden === true,
    })

    return (
      <div className={styles.container}>
        <div className={styles.LeftContainer}>
          <div className={styles.header}>
            <div className={styles.btnList}>
              <div className={styles.btn}>预览</div>
              <div className={styles.btn}>保存</div>
              <div className={styles.btn}>全屏</div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.settings}>
              <span onClick={this.toggleComponentList}>btn</span>
            </div>
            <div
              className={styles.editRegion}
            >
              <div className={cls}>
                <Sortable options={comOption}>{this.renderComp(componetList)}</Sortable>
              </div>
              <div className={styles.dragRegion}>
                <div style={{ width: '375px', height: '667px', backgroundColor: 'white', margin: '20px'}}>
                  <Sortable options={
                    { ...sortableOption,
                      onAdd: evt => this.onAddItem(evt),
                      onUpdate: evt => this.onUpdate(evt),
                    }}
                    onClick={(evt) => this.onChoose(evt)}
                    key={_.uniqueId()}>
                      {this.renderView(this.state.viewData, '')}
                  </Sortable>
                </div>
              </div>
          </div>
          </div>
          <div className={styles.footer}>
            底部
          </div>
        </div>
        <div className={styles.RightContainer}>
          <div>
          属性编辑区  
          </div>
          xxx
          <div >
            <Color color={this.state.color} onChange={(c) =>this.changeHandler(c)}></Color>
          </div>
          ______________
          render...
          {this.renderConfig(this.state.info2, 'props')}
          ______________
          {this.state.reactNodeConfig!= {} ? this.renderConfig(this.state.reactNodeConfig, 'reactNodeProps') : null}
        </div>
      </div>
    );
  }
}

export default Home;
