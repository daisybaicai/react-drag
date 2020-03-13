import _ from 'loadsh';
/**
 * @description 路径转化成数组
 * @param {*} pathStr 
 */
export const indexToArray = pathStr => `${pathStr}`.split('-').map(n => +n);

/**
 * @description 是路径还是组件
 */
export const isPathorCom = pathIndex => {
  let result = true
  indexToArray(pathIndex).forEach(item => {
      if (isNaN(item)) {
          result = false
          return false
      }
  })
  return result
}

/**
 * @description 交换元素
 * @param {*} newIndex 新Index
 * @param {*} oldIndex 旧Index
 * @param {*} data 原data
 */
export const swap = (newIndex, oldIndex, data) => {
  let temp = data[newIndex];
  data[newIndex] = data[oldIndex];
  data[oldIndex] = temp; 
}

/**
 * @description 添加元素
 * @param {*} newIndex 新的Index路径
 * @param {*} data 原始data
 * @param {*} dragItem 需要添加的元素
 */
export const itemAdd = (newIndex, data, dragItem) => {
  let newindexarr = indexToArray(newIndex);
  const first = newindexarr.shift();
  let parent = data;
  if(newindexarr.length > 0) {
    parent = parent[first];
    newindexarr.forEach((item, index) => {
      if(index === newindexarr.length -1 ) {
        parent.children.splice(item, 0 , dragItem);
      } else {
        parent = parent.children[item];
      }
    })
  } else {
    parent.splice(first, 0 , dragItem);
  }
  return data;
}

/**
 * @description 删除元素
 * @param {*} oldIndex 原始Index路径
 * @param {*} data 原始data
 */
export const itemRemove = (oldIndex, data) => {
  const oldIndexArr = indexToArray(oldIndex);
  let first = oldIndexArr.shift();
  let parent = data;
  if(oldIndexArr.length > 0) {
    parent = parent[first];
    oldIndexArr.forEach((item, index) => {
      if(index === oldIndexArr.length -1) {
        parent.children.splice(item, 1);
      } else {
        parent = parent.children[item];
      }
    })
  } else {
    parent.splice(first, 1);
  }
  return data;
}

/**
 * 获得拖拽元素
 * @param {*} oldIndex 原始index
 * @param {*} data 原始data
 */
export const getDragItem = (oldIndex, data) => {
  const oldIndexArr = indexToArray(oldIndex);
  let result = {};
  oldIndexArr.forEach(item => {
    result = data[item];
    data = result.children;
  })
  return _.cloneDeep(result);
}

/**
 * @description 更新数组，用于同级拖拽排序
 * @param {*} newIndex 新index
 * @param {*} oldIndex 旧index
 * @param {*} data 原data
 * @param {*} parentPath 父组件路径
 */
export const UpdateItem = (newIndex, oldIndex, data, parentPath) => {
  const parentArr = indexToArray(parentPath);
  let first = parentArr.shift();
  let parent = data;
  if(parentArr.length > 0) {
    parent = data[first];
    parentArr.forEach((item, index) => {
      parent = parent.children[item];
    })
    swap(newIndex, oldIndex, parent.children);
  } else {
    // 第一层
    if(!isNaN(first)) {
      // 有一层父级元素，first不为NaN
      parent = data[first];
      swap(newIndex, oldIndex, parent.children);
    } else {
      // 最外层 parentArr为null，first为NaN
      parent = data;
      swap(newIndex, oldIndex, parent);
    }
  }
  return data;
}

/**
 * 通过从列表中拿的元素
 * @param {*} name 元素id名
 */
export const findItemObject = (componetList, name) => {
  const componentItem = componetList.filter(item => {
    if (item.name === name) {
      return true;
    } else {
      return false;
    }
  });
  return componentItem[0];
}

/**
 * @description 更新item信息
 * @param {*} newIndex 原index
 * @param {*} data data
 * @param {*} dragItem 点击的item
 */
export const itemUpdateInfo = (newIndex, data, dragItem) => {
  let newindexarr = indexToArray(newIndex);
  const first = newindexarr.shift();
  let parent = data;
  if(newindexarr.length > 0) {
    parent = parent[first];
    newindexarr.forEach((item, index) => {
      if(index === newindexarr.length -1 ) {
        parent.children.splice(item, 1, dragItem);
      } else {
        parent = parent.children[item];
      }
    })
  } else {
    parent.splice(first, 1, dragItem);
  }
  return data;
}