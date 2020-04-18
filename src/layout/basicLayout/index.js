import React, { useEffect, useState } from 'react';
import styles from './home.less';
import classNames from 'classnames';
import ComponentList from '../../components/ComponentList';
import TemplateList from '../../components/TemplateList';
import DragCanvas from '../../components/DragCanvas';
import ComponentConfig from '../../components/ComponentConfig';
import { connect } from 'dva';
import { SmileTwoTone } from '@ant-design/icons';
import { Tabs, Input, Modal, Form } from 'antd';
import UserMenu from '../../components/UserMenu';
const { TabPane } = Tabs;
const { TextArea } = Input;
import ActionMenu from '../../components/ActionMenu';

const IndexView = props => {
  const { dispatch, currentView } = props;

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

  // useEffect(() => {
  //   // 首次执行
  //   // 发送setcurrentview
  //   dispatch({
  //     type: 'drag/getPageCode',
  //   });
  //   // 获取当前组织
  //   dispatch({
  //     type: 'orginzation/getOrgArr',
  //   });
  //   dispatch({
  //     type: 'drag/getOwnTemplate',
  //   });
  // }, []);

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
              <ActionMenu active={props.location.pathname} excludes={[]} />
            </div>
            <div className={styles.userCenter}>
              <div className={styles.btn}>
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {props.children}
        </div>
        <div className={styles.footer}>
          MIT Licensed | Copyright © 2019.12.31-present Daisy
        </div>
      </div>
    </div>
  );
};

export default IndexView;
