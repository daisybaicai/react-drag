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
import { Tabs } from 'antd';
import UserMenu from '../components/UserMenu';
const { TabPane } = Tabs;
import ActionMenu from '../components/ActionMenu';


const IndexView = props => {
  const { dispatch } = props;

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
    </div>
  );
};

export default connect(({ drag }) => ({
  currentView: drag.currentView,
}))(IndexView);
