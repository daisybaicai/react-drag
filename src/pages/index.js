import React, { Component } from 'react';
import { Button, Tag, NavBar, Icon, InputItem, SearchBar, Result, Flex } from 'antd-mobile';
import { Input, Select } from 'antd';
import Sortable from 'react-sortablejs';
import _ from 'loadsh';
import classNames from 'classnames';
import { indexToArray, UpdateItem, isPathorCom, getDragItem, itemAdd, itemRemove, findItemObject, itemUpdateInfo } from '../utils/utils';
import styles from './home.less'
import componetList from './config';

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
    info2: []
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


  onChoose = (evt) => {
    let parent = evt.target;
    while(parent.getAttribute('data-id') == null) {
      parent = parent.parentNode;
    }
    const arrIndex = evt.target.getAttribute('data-id') || parent.getAttribute('data-id');
    const dragItem = getDragItem(arrIndex,_.clone(this.state.viewData));
    console.log('drag', dragItem);
    let info = {};
    info = dragItem.props;
    const componetFromList = findItemObject(componetList, dragItem.type);
    const config  =  componetFromList.config;
    this.setState({
      info, dragItem, arrIndex, info2: config
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
      const props = {
        'data-id': indexs,
        ...item.props
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
  renderConfig = (data) => {
    if(JSON.stringify(data) !== '[]') {
      return data.map((item) => {
        return (
          <div>
            <div><h3>{item.text}</h3></div>
            <div>{
              item.children.map(item => {
                console.log('chidlren', item);
                return (
                  <div>
                    {this.renderValue(item)}
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
   * @description 改变input配置项触发的函数
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

  renderValue = ({text: title, field: value, type, data}) => {
    let valueInfo = this.state.info;
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
    if (type === 'string') {
      return <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span >{title}</span>
        <Input value={valueInfo}  style={{ width: '50%' }} onChange={(e) =>this.changeValue(e.target.value, value)} />
      </div>;
    }
    if (type === 'array') {
      return <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span >{title}</span>
          <Select
            defaultValue={valueInfo}
            style={{ width: '50%' }}
            onChange={(v)=>{
              this.changeValue(v, value)
            }}
            >
            {
              data.map((item) => {
                return <Select.Option value={item}>{item}</Select.Option>
              })
            }
            </Select>
        </div>;
    }
    return <div >other</div>;
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
          ______________
          render...
          {this.renderConfig(this.state.info2)}
        </div>
      </div>
    );
  }
}

export default Home;
