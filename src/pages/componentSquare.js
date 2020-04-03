import React, { useEffect, useState } from 'react';
import styles from './square.less';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { UserOutlined } from '@ant-design/icons';
import { Tabs, Input, Form, Card, Avatar } from 'antd';
const { TabPane } = Tabs;
const { Meta } = Card;
import MyCard from '../components/Card';

const IndexView = props => {
  const { dispatch, personalList, publicList, orginzationList } = props;

  useEffect(() => {
    // 首次执行

    dispatch({
      type: 'components/getPersonalComponents',
    });
    dispatch({
      type: 'components/getPublicComponents',
    });
    dispatch({
      type: 'components/getOrginzationComponents',
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.LeftContainer}>
        <div className={styles.header}>
          <div className={styles.btnList}>
            <div className={styles.logo}>React-Drag</div>
            <div className={styles.operation}>组件广场</div>
            <div className={styles.userCenter}>
              <div className={styles.btn}>
                <UserOutlined style={{ fontSize: '22px' }} />
                用户中心
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.editRegion}>
            <div className={styles.ComponentList}>组件广场</div>
            <div className={styles.dragRegion}>
              <Tabs>
                <TabPane tab="个人组件" key="1">
                  <div style={{ display: 'flex' }}>
                    {personalList.map(item => {
                      return <MyCard info={item} key={item.id}/>;
                    })}
                  </div>
                </TabPane>
                <TabPane tab="公共组件" key="2">
                  <div style={{ display: 'flex' }}>
                    {publicList.map(item => {
                      return <MyCard info={item} key={item.id}/>;
                    })}
                  </div>
                </TabPane>
                <TabPane tab="组织组件" key="3">
                  <div style={{ display: 'flex' }}>
                    {orginzationList.map(item => {
                      return <MyCard info={item} key={item.id}/>;
                    })}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ components }) => ({
  personalList: components.personalList,
  publicList: components.publicList,
  orginzationList: components.orginzationList,
}))(IndexView);
