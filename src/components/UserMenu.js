import React from 'react';
import { connect } from 'dva';
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
  };

  const UserMenu = () => {
    return (
      <Menu onClick={onMenuClick}>
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
