import { List, Button, Modal, Form, Input } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

const OrginzationSquare = props => {
  const { dispatch, orgList, form } = props;
  const { getFieldDecorator } = form;

  const [visible, setVisible] = useState(false);

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

  /**
   * @description 创建组织,打开弹窗
   */
  const createOrginzation = () => {
    setVisible(true);
  };

  /**
   * @description 关闭弹窗
   */
  const hideModal = () => {
    setVisible(false);
  };

  /**
   * @description 提交表单
   * @param {*} e
   */
  const submitForm = e => {
    const {
      form: { validateFields },
    } = props;
    validateFields((err, value) => {
      if (!err) {
        let payload = {
          orgName: value.orgName,
          orgDescription: value.orgDescription,
        };
        dispatch({
          type: 'orginzation/createOrginzation',
          payload,
        });
        hideModal();
      }
    });
  };

  return (
    <div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" onClick={createOrginzation}>
            创建组织
          </Button>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 2,
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
        <Modal
          width="50%"
          title="创建组织"
          visible={visible}
          onOk={submitForm}
          onCancel={hideModal}
          okText="确认"
          cancelText="取消"
        >
          <div>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
              <Form.Item label="组织名称">
                {getFieldDecorator('orgName', {
                  rules: [{ required: true, message: '请输入组件名称' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="组织描述">
                {getFieldDecorator('orgDescription', {
                  rules: [{ required: true, message: '请输入组织描述' }],
                })(<TextArea />)}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default connect(({ orginzation }) => ({ orgList: orginzation.mylist }))(
  Form.create()(OrginzationSquare),
);
