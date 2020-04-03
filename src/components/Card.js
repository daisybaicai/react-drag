import React from 'react';
import styles from './card.less';

export default function(props) {
  const { info } = props;
    const { com_name} = info;
  return (
    <div style={{ width: '200px', marginRight: '20px' }}>
      <div className={styles.container}>
        <img style={{ width: '100px', height: '100px' }} />
      </div>
      <div style={{ padding: '24px' }}>
        <h4>组件名称 {com_name}</h4>
        <p>组件描述</p>
      </div>
      <div>
        <div
          style={{
            margin: 0,
            padding: 0,
            background: '#e8e8e8',
            display: 'flex',
          }}
        >
          <span style={{ flex: 1 }}>更新</span>
          <span style={{ flex: 1 }}>预览</span>
          <span style={{ flex: 1 }}>设置</span>
        </div>
      </div>
    </div>
  );
}
