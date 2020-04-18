import { List, Avatar, Icon } from 'antd';
import { connect } from 'dva';
import { useEffect } from 'react';
import { APPLICATION_TYPE } from '../common/enum';

const OrginzationSquare = props => {
  const { dispatch, orgList } = props;
  useEffect(() => {
    dispatch({
      type: 'orginzation/getOrganizationList',
    });
    return () => {
      //
    };
  }, []);

  const apply = item => {
    dispatch({
      type: 'orginzation/postApplication',
      payload: {
        org_id: item.id,
        to_id: item.user_id,
        apply_status: 'PENDING',
      },
    });
  };

  const RenderIcon = ({ item }) => {
    const status = item.user_status;
    if (status === 'true') {
      return <span>已在组织</span>;
    } else if (item.apply_status == null) {
      return <span onClick={() => apply(item)}>申请加入</span>;
    } else {
      return <span>{APPLICATION_TYPE[item.apply_status]}</span>;
    }
  };

  return (
    <div>
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 3,
          }}
          dataSource={orgList}
          renderItem={item => (
            <List.Item
              key={item.org_name}
              actions={[<RenderIcon item={item} />]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={<a>{item.org_name}</a>}
                description={item.org_description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default connect(({ orginzation }) => ({ orgList: orginzation.list }))(
  OrginzationSquare,
);
