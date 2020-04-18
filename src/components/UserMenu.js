import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Dropdown, Menu } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const UserMenuDropdown = props => {
  const onMenuClick = event => {
    const { key } = event;
    const { dispatch } = props;

    if (key === 'logout') {

      if (dispatch) {
        dispatch({
          type: 'user/logout',
        });
      }

      return;
    }

    dispatch(routerRedux.push('/notification'));

  };

  const UserMenu = () => {
    return (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="1">通知中心</Menu.Item>
        <Menu.Item key="logout">退出登陆</Menu.Item>
      </Menu>
    );
  };

  return (
    <Dropdown overlay={UserMenu} trigger={['click']}>
      <div>
        <UserOutlined style={{ fontSize: '22px' }} />
        用户中心 <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default connect(({}) => ({}))(UserMenuDropdown);
