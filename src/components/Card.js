import React, { useState } from 'react';
import styles from './card.less';
import { Modal, Button } from 'antd';

export default function(props) {
  const { info } = props;
  const { com_name, com_description, file_path } = info;

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  return (
    <div style={{ width: '200px', marginRight: '20px' }}>
      <div className={styles.container}>
        <img style={{ width: '100px' }} src={file_path} />
      </div>
      <div style={{ padding: '24px' }}>
        <h4>组件名称 {com_name}</h4>
        <p>组件描述 {com_description}</p>
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
          <span style={{ flex: 1 }} onClick={showModal}>
            预览
          </span>
          <span style={{ flex: 1 }}>设置</span>
        </div>
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div >
            <img style={{ width: '400px' }} src={file_path} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
