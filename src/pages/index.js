import React, { Component } from 'react';
import { Button, Tag, NavBar, Icon, InputItem, SearchBar, Result } from 'antd-mobile';
import Sortable from 'react-sortablejs';
import _ from 'loadsh';
import classNames from 'classnames';
import { indexToArray, UpdateItem, isPathorCom, getDragItem, itemAdd, itemRemove, findItemObject, itemUpdateInfo } from '../utils/utils';
import styles from './home.less'

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
    name: 'Button',
    nested: false,
    attr: {},
    props: {
      type: 'dashed'
    },
    text: 'btn',
  },
  {
    name: 'div',
    nested: true,
    attr: {
      style: {
        border: '1px solid red',
      },
    },
    children: []
  },
  {
    name: 'div',
    nested: true,
    attr: {
      style: {
        border: '1px solid black',
      },
    },
    children: [
      {
        name: 'Button',
        nested: false,
        attr: {},
        text: 'btn',
      },
      {
        name: 'Tag',
        nested: false,
        attr: {},
        text: 'tag',
      },
    ],
  },
];

const componetList = [
  {
    name: 'Button',
    nested: false,
    attr: {},
    text: 'btn',
    props: {
      type: 'dashed'
    },
    needDiv: false,
  },
  {
    name: 'Tag',
    nested: false,
    attr: {},
    text: 'tag',
    needDiv: false,
  },
  {
    name: 'div',
    nested: true,
    attr: {
      style: {
        border: '1px solid black',
        height: '100px',
        width: '',
      },
    },
    children: []
  },
  {
    name: 'NavBar',
    nested: false,
    attr: {},
    text: '导航',
    needDiv: false,
  },
  {
    name: 'InputItem',
    nested: false,
    attr: {},
    text: '标题',
    needDiv: true,
  },
  {
    name: 'SearchBar',
    nested: false,
    attr: {},
    text: '',
    needDiv: true
  },
  {
    name: 'Result',
    nested: false,
    attr: {},
    text: ''
  }
];
class Home extends Component {
  state = {
    viewData: [],
    ComListHidden: false,
    info: {},
    dragItem: {},
    arrIndex: ''
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
    const info = {};
    info.text = dragItem.text;
    this.setState({
      info, dragItem, arrIndex
    })
  }

  renderComp(data) {
    return data.map(item => {
      return (
        <div data-id={item.name} key={_.uniqueId()}>
          <Tag>{item.name}</Tag>
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
        let { attr: style = {} } = item;
        return (
          <div style={style.style} className="sortable-nested" data-id={indexs} key={_.uniqueId()} props={item.props} >
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
      const Comp = GlobalComponent[item.name];
      const props = {
        'data-id': indexs
      }
      if(item.needDiv == true) {
        return <div data-id={indexs}><Comp>{item.text}</Comp></div>;
      } else {
        return React.createElement(Comp, props, item.text ? item.text : null)
      }
    });
  };

  toggleComponentList = () => {
    const { ComListHidden } = this.state;
    this.setState({
      ComListHidden: !ComListHidden
    })
  }

  handleChange = (e) => {
    const key = e.target.getAttribute('data-id');
    const { info, dragItem, arrIndex } = this.state;
    info[key] = e.target.value;
    this.setState({
      info
    })
    dragItem.text = info.text;
    const newdata = itemUpdateInfo(arrIndex, _.clone(this.state.viewData), dragItem);
    this.setState({
      viewData: newdata
    })
  }

  // comrender = ()  => {
  //   const item = {
  //     name: 'searbar',
  //     props: {
  //       // placeholder: 'hah',
  //       'data-id': 'title',
  //     },
  //     text: 'ss'
  //   }
  //   const com = GlobalComponent['Button'];
  //   return React.createElement(com, item.props, item.text ? item.text : null)
  // }

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
          text: <input data-id="text" value={this.state.info.text} onChange={this.handleChange}/>
          font-size: <input value={this.state.info.fontSize}/>
          width: <input value={this.state.info.width}/>
          height: <input value={this.state.info.height}/>
        </div>
      </div>
    );
  }
}

export default Home;
