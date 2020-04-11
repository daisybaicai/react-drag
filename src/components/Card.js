import React, { useState } from 'react';
import styles from './card.less';
import { Modal, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

const card = (props) => {
  const { info, dispatch } = props;
  const { com_name, com_description, file_path,id } = info;

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

  const PageJumpToDetail = () => {
    dispatch(routerRedux.push(`/${id}/componentDrag`));
  }

  return (
    <div style={{ width: '200px', marginRight: '20px' }}>
      <div className={styles.container}>
        <img style={{ width: '100px' }} src={file_path} />
      </div>
      <div style={{ padding: '24px' }}>
        <h4>{com_name}</h4>
        <div style={{ height: '50px'}}>{com_description}</div>
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
          <span style={{ flex: 1, textAlign: 'center' }} onClick={PageJumpToDetail}>更新</span>
          <span style={{ flex: 1, textAlign: 'center' }} onClick={showModal}>
            预览
          </span>
          <span style={{ flex: 1, textAlign: 'center' }}>设置</span>
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

export default connect(({}) => ({}))(card);