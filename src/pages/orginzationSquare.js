import { List, Avatar, Icon } from 'antd';
import { connect } from 'dva';
import { useEffect } from 'react';

// const IconText = ({ type, text }, item) => {
//   console.log('item', item);
//   return (
//     <span>
//       <Icon type={type} style={{ marginRight: 8 }} />
//       {text}
//     </span>
//   );
// };

// const RenderIcon = ({ item }) => {
//   const status = item.user_status;
//   if (status === 'true') {
//     return <span>已在组织</span>;
//   } else {
//     return <span onClick={() => apply(item)}>申请加入</span>;
//   }
// };

// const apply = item => {
//   dispatch({
//     type: 'orginzation/postApplication',
//     payload: {
//       org_id: item.id,
//       to_id: item.user_id,
//       type: 'PENDING',
//     }
//   })
//   console.log('item', item);
// };

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
    console.log('item', item);
  };

  const RenderIcon = ({ item }) => {
    const status = item.user_status;
    if (status === 'true') {
      return <span>已在组织</span>;
    } else {
      return <span onClick={() => apply(item)}>申请加入</span>;
    }
  };

  return (
    <div>
      组织广场
      <div>
        id, org_name , user_id(create_by), org_org_description , 是否在该组织
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
                // <span>已在组织</span>,
                // <span onClick={() => apply(item)}>申请加入</span>,
                <RenderIcon item={item} />,
                // <IconText
                //   type="star-o"
                //   text="156"
                //   key="list-vertical-star-o"
                // />,
                // <IconText
                //   type="like-o"
                //   text="156"
                //   key="list-vertical-like-o"
                // />,
                // <IconText
                //   type="message"
                //   text="2"
                //   key="list-vertical-message"
                // />,
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
              {/* {item.content} */}
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
