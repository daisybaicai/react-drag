import React, { useEffect, useState } from 'react';
import styles from './home.less';
import classNames from 'classnames';
import ComponentList from '../components/ComponentList';
import TemplateList from '../components/TemplateList';
import DragCanvas from '../components/DragCanvas';
import ComponentConfig from '../components/ComponentConfig';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {
  SmileTwoTone,
  TeamOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Tabs, Input, Modal, Form } from 'antd';
const { TabPane } = Tabs;
const { TextArea } = Input;

const IndexView = props => {
  const { dispatch, currentView, form } = props;
  const { getFieldDecorator } = form;

  const [comListHidden, setComListHidden] = useState(false);

  /**
   * @description 左边切换的事件，是否显示componentList
   */
  const toggleComponentList = () => {
    setComListHidden(!comListHidden);
  };

  const cls = classNames(styles.ComponentList, {
    [styles.hidden]: comListHidden === true,
  });

  /**
   * @description 生成预览代码
   */
  const CodePreview = () => {
    dispatch(routerRedux.push('/codePreview'));
  };

  useEffect(() => {
    // 首次执行
    console.log('mount----');
    // 发送setcurrentview
    dispatch({
      type: 'drag/getPageCode',
    });
    // 获取当前组织
    dispatch({
      type: 'orginzation/getOrgArr',
    });
    dispatch({
      type: 'drag/getOwnTemplate',
    });
  }, []);

  /**
   * @description 发送到服务器
   */
  const postToServer = () => {
    dispatch({
      type: 'drag/putPageCode',
      payload: { code: currentView },
    });
  };

  const [visible, setVisible] = useState(false);
  /**
   * @description 创建组织,打开弹窗
   */
  const createOrginzation = () => {
    setVisible(true);
  };

  /**
   * @description 关闭弹窗
   */
  const hideModal = () => {
    setVisible(false);
  };

  /**
   * @description 提交表单
   * @param {*} e
   */
  const submitForm = e => {
    // console.log('e', e);
    const {
      form: { validateFields },
    } = props;
    validateFields((err, value) => {
      if (!err) {
        let payload = {
          orgName: value.orgName,
          orgDescription: value.orgDescription,
        };
        console.log('payload', payload);
        dispatch({
          type: 'orginzation/createOrginzation',
          payload,
        });
        hideModal();
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.LeftContainer}>
        <div className={styles.header}>
          <div className={styles.btnList}>
            <div className={styles.logo}>React-Drag</div>
            <div className={styles.operation}>
              <div className={styles.btn} onClick={createOrginzation}>
                <TeamOutlined style={{ fontSize: '22px' }} />
                新建组织
              </div>
              <div className={styles.btn} onClick={postToServer}>
                <CheckCircleOutlined style={{ fontSize: '22px' }} />
                保存到服务器
              </div>
              <div className={styles.btn} onClick={CodePreview}>
                <SyncOutlined style={{ fontSize: '22px' }} />
                生成代码预览
              </div>
            </div>
            <div className={styles.userCenter}>
              <div className={styles.btn} onClick={CodePreview}>
                <UserOutlined style={{ fontSize: '22px' }} />
                用户中心
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.settings}>
            <span onClick={toggleComponentList}>
              <SmileTwoTone style={{ fontSize: '24px' }} />
            </span>
          </div>
          <div className={styles.editRegion}>
            <div className={cls}>
              <Tabs>
                <TabPane tab="公共组件" key="1">
                  <ComponentList />
                </TabPane>
                <TabPane tab="组件模版" key="2">
                  <TemplateList />
                </TabPane>
              </Tabs>
            </div>
            <div className={styles.dragRegion}>
              <DragCanvas />
            </div>
          </div>
          <div className={styles.RightContainer}>
            <div className={styles.title}>属性编辑区</div>
            <ComponentConfig />
          </div>
        </div>
        <div className={styles.footer}>底部</div>
      </div>
      <Modal
        width="50%"
        title="创建组织"
        visible={visible}
        onOk={submitForm}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <div>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
            <Form.Item label="组织名称">
              {getFieldDecorator('orgName', {
                rules: [{ required: true, message: '请输入组件名称' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="组织描述">
              {getFieldDecorator('orgDescription', {
                rules: [{ required: true, message: '请输入组织描述' }],
              })(<TextArea />)}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ drag }) => ({
  currentView: drag.currentView,
}))(Form.create()(IndexView));
