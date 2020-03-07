import React, { Component } from 'react';
import { Button, Tag } from 'antd';
import Sortable from 'react-sortablejs';
import _ from 'loadsh';
import { indexToArray, UpdateItem, isPathorCom, getDragItem, itemAdd, itemRemove, findItemObject } from '../utils/utils';

const GlobalComponent = {
  Button,
  Tag,
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
  },
  {
    name: 'Tag',
    nested: false,
    attr: {},
    text: 'tag',
  },
  {
    name: 'div',
    nested: true,
    attr: {
      style: {
        border: '1px solid black',
      },
    },
    children: []
  },
];
class Home extends Component {
  state = {
    viewData: [],
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
      // 将嵌套的没有子元素的都加上children属性
      if (item.nested && !item.children) {
        item.children = [];
      }
      // 渲染，有子元素的嵌套的
      if (item.children) {
        let { attr: style = {} } = item;
        return (
          <div style={style.style} className="sortable-nested" data-id={indexs} key={_.uniqueId()}>
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
      return <Comp data-id={indexs}>{item.text}</Comp>;
    });
  };

  render() {
    return (
      <>
        <div id="items">
          <Sortable options={comOption}>{this.renderComp(componetList)}</Sortable>
          --------
        </div>
        <div
          id="container"
          style={{ border: '1px dotted gray', minHeight: '400px', padding: '20px' }}
        >
          <Sortable options={{ ...sortableOption, onAdd: evt => this.onAddItem(evt),                 onUpdate: evt => this.onUpdate(evt),
 }} key={_.uniqueId()}>
            {this.renderView(this.state.viewData, '')}
          </Sortable>
        </div>
      </>
    );
  }
}

export default Home;
