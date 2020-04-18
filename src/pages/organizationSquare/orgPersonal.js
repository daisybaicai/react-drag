import { List, Avatar, Icon } from 'antd';
import { connect } from 'dva';
import { useEffect } from 'react';

const OrginzationSquare = props => {
  const { dispatch, orgList } = props;
  useEffect(() => {
    dispatch({
      type: 'orginzation/getPersonalOrganizationList',
    });
    return () => {
      //
    };
  }, []);

  const RenderIcon = ({ item }) => {
    const status = item.user_status;
    if (status === 'true') {
      return <span>已在组织</span>;
    }
    return null;
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
              actions={[
                <RenderIcon item={item} />,
              ]}
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

export default connect(({ orginzation }) => ({ orgList: orginzation.mylist }))(
  OrginzationSquare,
);
