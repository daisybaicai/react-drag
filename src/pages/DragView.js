import React, { useEffect, useState } from 'react';
import styles from './home.less';
import classNames from 'classnames';
import ComponentList from '../components/ComponentList';
import TemplateList from '../components/TemplateList';
import DragCanvas from '../components/DragCanvas';
import ComponentConfig from '../components/ComponentConfig';
import { connect } from 'dva';
import {
  SmileTwoTone,
} from '@ant-design/icons';
import { Tabs, Input, Modal, Form } from 'antd';
import UserMenu from '../components/UserMenu';
const { TabPane } = Tabs;
const { TextArea } = Input;
import ActionMenu from '../components/ActionMenu';


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


  useEffect(() => {
    // 首次执行
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
    const {
      form: { validateFields },
    } = props;
    validateFields((err, value) => {
      if (!err) {
        let payload = {
          orgName: value.orgName,
          orgDescription: value.orgDescription,
        };
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
              <ActionMenu active="/drag" excludes={[]}/>
            </div>
            <div className={styles.userCenter}>
              <div className={styles.btn}>
                <UserMenu />
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
                  <div style={{ height: '80vh', overflowY: 'scroll' }}>
                    <ComponentList />
                  </div>
                </TabPane>
                <TabPane tab="组件模版" key="2">
                  <div style={{ height: '80vh', overflowY: 'scroll' }}>
                    <TemplateList />
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <div className={styles.dragRegion}>
              <DragCanvas isPage={true} />
            </div>
          </div>
          <div className={styles.RightContainer}>
            <div className={styles.title}>属性编辑区</div>
            <ComponentConfig isPage={true} />
          </div>
        </div>
        <div className={styles.footer}>
          MIT Licensed | Copyright © 2019.12.31-present Daisy
        </div>
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
