import React, { useState } from 'react';
import { connect } from 'dva';
import { Input, Select, Button, Modal, Form, Collapse, Spin, Switch } from 'antd';
import _ from 'loadsh';
import { itemUpdateInfo, itemRemove, itemCopy } from '../utils/utils';
import Color from './picker';
import html2canvas from 'html2canvas';
import defaultPng from '../assets/components/button.png';

const { Option } = Select;
const { Panel } = Collapse;

const Config = props => {
  const [visible, setVisible] = useState(false);
  const [showOrginzation, setShowOrginzation] = useState(false);

  const {
    pageConfig,
    currentPageView,
    currentComponentView,
    componentConfig,
    dispatch,
    form,
    orgArr,
    isPage,
  } = props;
  const { getFieldDecorator } = form;

  const config = isPage ? pageConfig : componentConfig;
  const currentView = isPage ? currentPageView : currentComponentView;

  const [imgBlob, setImgBlob] = useState(null);
  const [imgSrc, setImgSrc] = useState(defaultPng);
  const [imgLoading, setImgLoading] = useState(true);
  /**
   * @description 配置项的渲染组件
   * @param {*} data 该配置项的数据结构
   */
  const renderConfig = (data, type) => {
    if (JSON.stringify(data) !== '[]' && data) {
      return data.map((item, index) => {
        return (
          <Panel header={item.text} key={item.text}>
            <div key={index}>
              {/* <div>
              <h3>{item.text}</h3>
            </div> */}
              <div>
                {item.children.map((item, index) => {
                  return <div key={index}>{renderValue(item, type)}</div>;
                })}
              </div>
            </div>
          </Panel>
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
      // if(typeof valueInfo !== 'string') {
      //   valueInfo = '' + valueInfo;
      // }
      // console.log('v', valueInfo);
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
                <Select.Option value={item.value} key={index}>
                  {item.text}
                </Select.Option>
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
    if (type === 'boolean') {
      return (<div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{title}</span>
        <Switch
          defaultChecked={valueInfo}
          style={{ width: '50%' }}
          onChange={v => {
            changeValueParent(propsType, v, value);
          }}
        />
      </div>);
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
      type: 'drag/setConfig',
      payload: {
        propsInfo: data,
      },
      isPage,
    });

    dragItem.props = data;
    const oldData = _.cloneDeep(currentView);
    const newdata = itemUpdateInfo(arrIndex, oldData, dragItem);
    // setCurrentView
    dispatch({
      type: 'drag/setCurrentView',
      payload: newdata,
      isPage,
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
      type: 'drag/setConfig',
      payload: {
        nodePropsInfo: data,
      },
      isPage,
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
      isPage,
    });
  };

  /**
   * @description 删除组件
   */
  const RemoveComponent = () => {
    const newdata = itemRemove(config.arrIndex, _.cloneDeep(currentView));
    // 发送请求
    dispatch({
      type: 'drag/removeCurrentView',
      payload: newdata,
      isPage,
    });
  };

  /**
   * @description 复制组件
   */
  const CopyComponent = () => {
    const newdata = itemCopy(
      config.arrIndex,
      _.cloneDeep(currentView),
      config.dragItem,
    );
    // 发送请求
    dispatch({
      type: 'drag/setCurrentView',
      payload: newdata,
      isPage,
    });
  };

  const RenderFunction = (src, width, height, cb) => {
    const img = new Image();
    img.src = src;
    img.width = width;
    img.height = height;
    img.crossOrigin = '';
    // 保证图片加载完毕以后再返回
    img.onload = () => {
      cb && cb(img);
    }
  };

  const Download = (url, name) => {
    const target = document.createElement('a');
    target.href = url;
    target.download = name;
    const event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    target.dispatchEvent(event);
  };

  var convertBase64UrlToBlob = function(urlData) {
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], { type: mime });
  };

  /**
   * @description 生成模版
   */
  const GenerateTemplate = () => {
    setImgSrc(defaultPng);
    const dragContainer = document.getElementsByClassName('selectDrag')[0];
    const opts = {
      logging: false,
      scale: 2,
      useCORS: true,
    };
    html2canvas(dragContainer, opts).then(res => {
      const { height, width } = res;
      const base64 = res.toDataURL('image/png', 1);
      RenderFunction(base64, width, height, img => {
        // document.body.appendChild(img);
        const blob = convertBase64UrlToBlob(base64);
        // console.log('blob', blob);
        setImgBlob(blob);
        console.log('img', img);
        if (img) {
          // setImgSrc(img.src);
          setImgSrc(img.src);
          setImgLoading(false);
        }
      });
    });
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  /**
   * @description 提交表单
   * @param {*} e
   */
  const submitForm = () => {
    const {
      form: { validateFields },
    } = props;
    validateFields(async (err, value) => {
      if (!err) {
        const resfilePath = await UploadFile();
        let payload = {
          ...value,
          comCode: config.dragItem,
          filePath: resfilePath,
        };
        await dispatch({
          type: 'drag/setTemplateList',
          payload,
        });
        await dispatch({
          type: 'drag/getOwnTemplate',
        });
        hideModal();
        // dispatch({
        //   type: 'drag/getOwnTemplate'
        // })
      }
    });
  };

  const UploadFile = () => {
    let formData = new FormData();
    formData.append('image', imgBlob, 'image.png');
    return dispatch({
      type: 'components/uploadFile',
      payload: formData,
    });
  };

  const handleChange = value => {
    if (value === 'ORGINZATION') {
      setShowOrginzation(true);
    } else {
      setShowOrginzation(false);
    }
  };

  return (
    <div>
      <Button onClick={CopyComponent} icon="copy" size="small">
        复制组件
      </Button>
      <Button onClick={RemoveComponent} icon="delete" size="small">
        删除组件
      </Button>
      {isPage ? (
        <Button onClick={GenerateTemplate} icon="edit" size="small">
          生成模版
        </Button>
      ) : null}
      <Collapse defaultActiveKey={['样式', '主题', '文字内容']}>
        {renderConfig(config.propsConfig, 'props')}
        {renderConfig(config.nodePropsConfig, 'reactNodeProps')}
      </Collapse>
      {isPage ? (
        <Modal
          width="50%"
          title="生成模版"
          visible={visible}
          onOk={submitForm}
          onCancel={hideModal}
          okText="确认"
          cancelText="取消"
        >
          <div>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
              <Form.Item label="组件名称">
                {getFieldDecorator('comName', {
                  rules: [{ required: true, message: '请输入组件名称' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="组件状态">
                {getFieldDecorator('comStatus', {
                  rules: [{ required: true, message: '请输入组件状态' }],
                })(
                  <Select style={{ width: 120 }} onChange={handleChange}>
                    <Option value="PUBLIC">公开</Option>
                    <Option value="PERSONAL">个人</Option>
                    <Option value="ORGINZATION">组织</Option>
                  </Select>,
                )}
              </Form.Item>
              {showOrginzation ? (
                <>
                  <Form.Item label="所属组织">
                    {getFieldDecorator('comOrgArr', {
                      rules: [{ required: true, message: '请选择所属组织' }],
                    })(
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请选择组件所公开属于的组织"
                      >
                        {orgArr.map(item => (
                          <Option key={item}>{item}</Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                </>
              ) : null}
              <Form.Item label="组件描述">
                {getFieldDecorator('comDescription', {
                  rules: [{ required: true, message: '请输入组件描述' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="图片">
                <div style={{width: '300px'}}>
                  <Spin spinning={imgLoading}>
                    <img
                      id="myid"
                      src={imgSrc}
                      width="300px"
                      alt="图片模版预览"
                    />
                  </Spin>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default connect(({ drag, orginzation }) => ({
  pageConfig: drag.config,
  currentPageView: drag.currentView,
  orgArr: orginzation.orgArr,
  currentComponentView: drag.componentView,
  componentConfig: drag.componentConfig,
}))(Form.create()(Config));
