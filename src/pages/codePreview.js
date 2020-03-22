import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'dva';
import _ from 'loadsh';
import { message } from 'antd';

const codePreview = props => {
  const { dispatch, currentView } = props;
  const [code, setCode] = useState('');

  /**
   * @description 得到依赖组件
   */
  const dependComponents = () => {
    // 得到对象数组
    const stringCurrentView = JSON.stringify(currentView);
    // 正则
    var regex = /\"type\":\"\w+\"/g;
    // 匹配到所有相关字符串数组
    const StringArr = stringCurrentView.match(regex);
    const newarr = StringArr.map(item => {
      return item.replace(/\"type\":\"(.*?)\"/g, '$1');
    });
    // 数组去重
    const components = [...new Set(newarr)];
    // 当前的依赖list
    const componentsList = [
      'Tag',
      'Button',
      'Div',
      'InputItem',
      'NavBar',
      'Result',
    ];
    // 过滤
    const dependComponents = components.filter(item => {
      return componentsList.includes(item);
    });
    return dependComponents;
  };

  /**
   * @description 渲染成jsx
   */
  const renderJSONtoJSX = () => {
    const arr = dependComponents();
    const dependCom =
      arr.length > 0 ? `import { ${arr.join(', ')} } from 'antd-mobile';` : '';
    return `
    import React, { Component } from 'react';
    ${dependCom}
  
    class Index extends Component {
      constructor () {
        super();
      }
      render(){
        return ${renderDom(currentView)}
      }
    }
    export default Index;
    `;
  };

  /**
   * @description 渲染jsx dom
   * @param {*} data 视图数据
   */
  const renderDom = data => {
    let result = ``;
    data.map(item => {
      if (item.children) {
        result += `
          <${item.type} ${renderStyle(item.props.style)}>
            ${renderDom(item.children)}
          </${item.type}>
          `;
      } else {
        const { props, nodeProps } = item;
        result += `<${item.type} ${renderProps(props)} ${renderNodeProps(
            nodeProps,
          )}${renderStyle(props.style)}>${props.content ? props.content : ''}</${
            item.type
          }>`;
      }
    });
    return result;
  };

  /**
   * @description 渲染props
   * @param {*} props props
   */
  const renderProps = props => {
    let propsResult = ``;
    for (const key in props) {
      if (props.hasOwnProperty(key) && key != 'style' && key != 'content') {
        const value = props[key];
        propsResult += ` ${key}="${value}"`;
      }
    }
    return propsResult;
  };

  /**
   * @description 渲染nodeProps
   * @param {*} props props
   */
  const renderNodeProps = props => {
    let nodePropsResult = ``;
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const value = props[key];
        nodePropsResult += `${key}={${value.renderString(value.params)}}`;
      }
    }
    return nodePropsResult;
  };

  /**
   * @description 渲染style
   * @param {*} style style
   */
  const renderStyle = style => {
    let styleResult = ``;
    for (const key in style) {
      if (style.hasOwnProperty(key) && key != 'border' && style[key]) {
        const value = style[key];
        styleResult += `"${key}": "${value}"`;
      }
    }
    return styleResult ? `style={{${styleResult}}}}` : ``;
  };

  useEffect(() => {
    if (currentView.length > 0) {
      const code = renderJSONtoJSX();
      setCode(code);
    } else {
      // 没有currentview
      message.warning('视图为空，所以无法生成代码，建议返回页面');
    }
  }, [currentView]);

  const options = {
    selectOnLineNumbers: true,
  };
  return (
    <div>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
      />
    </div>
  );
};

export default connect(({ drag }) => ({
  currentView: drag.currentView,
}))(codePreview);
