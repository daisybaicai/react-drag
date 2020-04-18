import { connect } from 'dva';
import {
  Table,
  message,
  Divider,
  Popconfirm,
  Icon,
} from 'antd';
import { useState, useEffect } from 'react';

const application = props => {
  const {list,loading, dispatch, popLoading} = props;

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectId, setSelectId] = useState(null);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [okVisible, setOkVisible] = useState(false);

  const Columns = [
    {
        title: '组织id',
        dataIndex: 'org_id',
    },
    {
      title: '组织名',
      dataIndex: 'org_name',
    },
    {
      title: '申请用户',
      dataIndex: 'username',
    },
    {
        title: '当前状态',
        dataIndex: 'apply_status',
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Popconfirm
            title="确认拒绝该用户加入组织？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => handleApplication(record.id, 'REJECT')}
            onCancel={() => handlePop(null, false)}
            visible={selectId === record.id && rejectVisible}
            okText="确认"
            cancelText="取消"
          >
            <a className="errorLink" onClick={() => handlePop(record.id, true, 'reject')}>
              拒绝
            </a>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title="确认同意该用户加入组织？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => handleApplication(record.id, 'ACCEPT')}
            onCancel={() => handlePop(null, false)}
            visible={selectId === record.id && okVisible}
            okText="确认"
            cancelText="取消"
          >
            <a className="errorLink" onClick={() => handlePop(record.id, true, 'ok')}>
              同意
            </a>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
      getList();
      return () => {
          //
      };
  }, []);


  const getList = () => {
    dispatch({
        type: 'application/getApplicationList'
    })
  }

  /**
   * 控制气泡显隐
   */
  const handlePop = (id, visible, type) => {
    setSelectId(id);
    if(type === 'ok') {
        setOkVisible(visible)
        setRejectVisible(!visible);
    } else {
        setRejectVisible(visible);
        setOkVisible(!visible);
    }
  };


  const handleApplication = (id, type) => {
    if (popLoading) {
      return;
    }
    dispatch({
      type: 'application/replyApplication',
      payload: {
          id,
          apply_status: type,
      },
    })
      .then(data => {
        message.success(data);
        handlePop(null, false, 'ok');
        getList();
      })
      .catch(err => {
        message.error(err);
        handlePop(null, false, 'ok');
      });
  };

  return (
    <div>
      <Table
        columns={Columns}
        dataSource={list.list}
        onChange={(page) => {setCurrent(page.current)}}
        pagination={{
          current,
          pageSize,
          showTotal(total) {
            return `共${total}条记录 第${this.current}/${Math.ceil(
              total / this.pageSize,
            )}页`;
          },
        }}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default connect(({ application,loading }) => ({
    list: application.list,
    loading: loading.effects['application/getApplicationList'],
    popLoading: loading.effects['application/replyApplication'],
  }))(application);
