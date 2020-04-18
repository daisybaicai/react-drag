import { Icon } from 'antd';
import styles from './menu.less';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';


const ActionMenu = props => {
  const { active, dispatch, currentView } = props;
  const getMenu = () => {
    const filterMenu = menu.filter(item => {
      let flag = true;
      if(item.includes) {
        flag = item.includes.includes(active);
      }
      if(item.exclude) {
        flag = !item.exclude.includes(active);
      }
      return flag;
    });
    return filterMenu;
  };

  const handleClick = item => {
    switch (item.type) {
      case 'url':
        handleUrl(item.url);
        break;
      case 'request':
        handleRequest(item.render);
        break;
      default:
        handleUrl(item.url);
    }
  };

  const handleRequest = (render) => {
      render();
  }

  const handleUrl = url => {
    dispatch(routerRedux.push(url));
  };

  const menu = [
    {
      title: '页面编辑',
      type: 'url',
      url: '/drag',
      icon: 'highlight',
    },
    {
      title: '组件广场',
      type: 'url',
      url: '/comsquare',
      icon: 'appstore',
    },
    {
        title: '组织广场',
        type: 'url',
        url: '/org',
        icon: 'team',
    },
    {
      title: '保存页面',
      type: 'request',
      icon: 'check-circle',
      render: () => {
        dispatch({
          type: 'drag/putPageCode',
          payload: { code: currentView },
        });
      },
      includes: ['/drag'],
      exclude: ['/codePreview', '/org', '/comsquare'],
    },
    {
      title: '代码预览',
      url: '/codePreview',
      icon: 'sync',
      type: 'url',
      exclude: ['/org', '/comsquare'],
    },
  ];

  return (
    <>
      {getMenu().map(item => {
        return (
          <div
            className={styles.btn}
            style={{ color: item.url === active ? '#1890FF' : '' }}
            onClick={() => handleClick(item)}
          >
            <Icon type={item.icon} style={{ fontSize: '22px' }} />
            {item.title}
          </div>
        );
      })}
    </>
  );
};

export default connect(({ drag }) => ({
    currentView: drag.currentView,
  }))(ActionMenu);