import React, { useEffect } from 'react';
import styles from './square.less';
import { connect } from 'dva';
import { Tabs, Empty } from 'antd';
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

  const renderList = list => {
    if (list && list.length > 0) {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {list.map(item => {
            return <MyCard info={item} key={item.id} />;
          })}
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
          }}
        >
          <Empty description="暂无组件"/>
        </div>
      );
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.editRegion}>
        <div className={styles.dragRegion}>
          <Tabs>
            <TabPane tab="个人组件" key="1">
              {renderList(personalList)}
            </TabPane>
            <TabPane tab="公共组件" key="2">
              {renderList(publicList)}
            </TabPane>
            <TabPane tab="组织组件" key="3">
              {renderList(orginzationList)}
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
