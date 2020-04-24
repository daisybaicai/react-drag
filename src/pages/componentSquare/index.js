import React, { useEffect } from 'react';
import styles from './square.less';
import { connect } from 'dva';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import MyCard from '@/components/Card';

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
    <div className={styles.content}>
      <div className={styles.editRegion}>
        <div className={styles.dragRegion}>
          <Tabs>
            <TabPane tab="个人组件" key="1">
              <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {personalList.map(item => {
                  return <MyCard info={item} key={item.id} />;
                })}
              </div>
            </TabPane>
            <TabPane tab="公共组件" key="2">
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {publicList.map(item => {
                  return <MyCard info={item} key={item.id} />;
                })}
              </div>
            </TabPane>
            <TabPane tab="组织组件" key="3">
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {orginzationList.map(item => {
                  return <MyCard info={item} key={item.id} />;
                })}
              </div>
            </TabPane>
          </Tabs>
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
