import React from 'react';
import styles from './square.less';
import { connect } from 'dva';
import { Tabs } from 'antd';
import All from './orgAll';
import Personal from './orgPersonal';
import Application from './application';

const { TabPane } = Tabs;


const IndexView = props => {

  return (
    <div className={styles.content}>
      <div className={styles.editRegion}>
        <div className={styles.dragRegion}>
          <Tabs>
            <TabPane tab="所有" key="1">
              <div style={{ padding: '0 20px' }}>
                <All />
              </div>
            </TabPane>
            <TabPane tab="个人" key="2">
              <div style={{ padding: '0 20px' }}>
                <Personal />
              </div>
            </TabPane>
            <TabPane tab="申请" key="3">
              <div style={{ padding: '0 20px' }}>
                <Application />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default connect(({}) => ({}))(IndexView);
