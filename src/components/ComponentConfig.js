import React from 'react';
import { connect } from 'dva';
import { Input, Select, Button } from 'antd';
import _ from 'loadsh';
import { itemUpdateInfo, itemRemove, itemCopy } from '../utils/utils';
import Color from './picker';

const Config = props => {
  const { config, currentView, dispatch } = props;
  /**
   * @description 配置项的渲染组件
   * @param {*} data 该配置项的数据结构
   */
  const renderConfig = (data, type) => {
    if (JSON.stringify(data) !== '[]' && data) {
      return data.map((item, index) => {
        return (
          <div key={index}>
            <div>
              <h3>{item.text}</h3>
            </div>
            <div>
              {item.children.map((item, index) => {
                return <div key={index}>{renderValue(item, type)}</div>;
              })}
            </div>
          </div>
        );
      });
    }
  };

  /**
   * @description render函数，渲染配置项
   */
  const renderValue = (
    { text: title, field: value, type, data },
    propsType,
  ) => {
    let valueInfo =
      propsType === 'props' ? config.propsInfo : config.nodePropsInfo;
    if (propsType === 'props') {
      if (value.indexOf('.') != -1) {
        const valuearr = value.split('.');
        valuearr.map((item, index) => {
          if (index == valuearr.length - 1) {
            valueInfo = valueInfo[item];
          } else {
            valueInfo = valueInfo[item];
          }
        });
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
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <Input
            value={valueInfo}
            style={{ width: '50%' }}
            onChange={e => changeValueParent(propsType, e.target.value, value)}
          />
        </div>
      );
    }
    if (type === 'array') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{title}</span>
          <Select
            defaultValue={valueInfo}
            style={{ width: '50%' }}
            onChange={v => {
              changeValueParent(propsType, v, value);
            }}
          >
            {data.map((item, index) => {
              return (
                <Select.Option value={item.value} key={index}>{item.text}</Select.Option>
              );
            })}
          </Select>
        </div>
      );
    }
    if (type === 'color') {
      return (
        <div style={{ display: 'flex' }}>
          <span>{title}</span>
          <Color
            color={valueInfo}
            style={{ width: '50%' }}
            onChange={color => changeValueParent(propsType, color, value)}
          />
        </div>
      );
    }
    return <div>other</div>;
  };

  /**
   * @description change事件
   * @param {string} type 对应类型['props','reactNodeProps']
   * @param {string} key 所对应到的属性名称 e.g:props.content -> content
   */
  const changeValueParent = (type, targetValue, key) => {
    if (type === 'props') {
      return changeValue(targetValue, key);
    }
    if (type === 'reactNodeProps') {
      return changeReactNodeValue(targetValue, key);
    }
  };

  /**
   * @description 改变input配置项触发的函数(props)
   * @param {e} e event触发得到的e
   * @param {string} key 所对应到的属性名称 e.g:props.content -> content
   */
  const changeValue = (targetValue, key) => {
    const { dragItem, arrIndex, propsInfo } = config;
    let data = _.cloneDeep(propsInfo);
    let configInfo = data;
    if (key.indexOf('.') != -1) {
      const keyarr = key.split('.');
      keyarr.map((item, index) => {
        if (index == keyarr.length - 1) {
          configInfo[item] = targetValue;
        } else {
          configInfo = configInfo[item];
        }
      });
    } else {
      configInfo[key] = targetValue;
    }
    // setConfig
    dispatch({
      type: 'drag/saveConfig',
      payload: {
        propsInfo: data,
      },
    });

    dragItem.props = data;
    const newdata = itemUpdateInfo(
      arrIndex,
      _.cloneDeep(currentView),
      dragItem,
    );
    // setCurrentView
    dispatch({
      type: 'drag/setCurrentView',
      payload: newdata,
    });
  };

  /**
   * @description 改变input配置项触发的函数(nodeProps)
   * @param {e} e event触发得到的e
   * @param {string} key 所对应到的属性名称 e.g:props.content -> content
   */
  const changeReactNodeValue = (targetValue, key) => {
    // set reactinfo的key， 修改reactnode的key
    const { nodePropsInfo, dragItem, arrIndex } = config;

    let data = _.cloneDeep(nodePropsInfo);
    let configInfo = data;
    // 分解key
    const valuearr = key.split('.');
    const objkey = valuearr[0];
    const params = valuearr[1];
    // 赋值给config里对应的key
    configInfo[objkey].params[params] = targetValue;

    // setConfig
    dispatch({
      type: 'drag/saveConfig',
      payload: {
        nodePropsInfo: data,
      },
    });

    // 对应渲染到页面上
    dragItem.nodeProps = data;
    const newdata = itemUpdateInfo(
      arrIndex,
      _.cloneDeep(currentView),
      dragItem,
    );

    // setCurrentView
    dispatch({
      type: 'drag/setCurrentView',
      payload: newdata,
    });
  };


  /**
   * @description 删除组件
   */
  const RemoveComponent = () => {
    const newdata = itemRemove(config.arrIndex, _.cloneDeep(currentView));
    // 发送请求
    dispatch({
      type: 'drag/setCurrentView',
      payload: newdata,
    });

    const comNameOrPath = config.dragItem.type;
    console.log('delelte', comNameOrPath);
    dispatch({
      type: 'drag/removeDependComponents',
      payload: comNameOrPath
    })
  }

  /**
   * @description 复制组件
   */
  const CopyComponent = () => {
    const newdata = itemCopy(config.arrIndex, _.cloneDeep(currentView), config.dragItem);
    // 发送请求
    dispatch({
      type: 'drag/setCurrentView',
      payload: newdata,
    });
    // 判断是否属于antd componets，像div不需要加
    // 只有在首次加入的时候，需要添加type的类型，也就是发送请求
    const comNameOrPath = config.dragItem.type;
    console.log('type', comNameOrPath);

    if(comNameOrPath !='div'){
      dispatch({
        type: 'drag/addDependComponents',
        payload: comNameOrPath
      })
    }
  }

  /**
   * @description 生成模版
   */
  const GenerateTemplate = () => {
    console.log('生成模版～～');
  }

  return (
    <div>
      <Button onClick={CopyComponent}>复制组件</Button>
      <Button onClick={RemoveComponent}>删除组件</Button>
      <Button onClick={GenerateTemplate}>生成模版</Button>
      ——————————
      {renderConfig(config.propsConfig, 'props')}
      ______________
      {renderConfig(config.nodePropsConfig, 'reactNodeProps')}
    </div>
  );
};

export default connect(({ drag }) => ({
  config: drag.config,
  currentView: drag.currentView,
}))(Config);
