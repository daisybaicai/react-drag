import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';

const login = props => {
  const { form, dispatch } = props;
  const { getFieldDecorator } = form;

  const submitForm = e => {
    console.log(e);
    const {
      form: { validateFields },
    } = props;
    validateFields((err, values) => {
      if (!err) {
        const payload = {
          username: values.username,
          password: values.password,
        };
        dispatch({
          type: 'user/login',
          payload,
        });
        console.log('values', values);
      }
    });
  };

  const submitFormResigster = e => {
    console.log(e);
    const {
      form: { validateFields },
    } = props;
    validateFields((err, values) => {
      if (!err) {
        const payload = {
          username: values.username,
          password: values.password,
        };
        dispatch({
          type: 'user/register',
          payload,
        });
        console.log('values', values);
      }
    });
  }

  return (
    <>
      登陆
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
        <Form.Item label="username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入username' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入password' }],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={submitForm}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      ---- 注册
      {/* <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
        <Form.Item label="username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入username' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入password' }],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="repassword">
          {getFieldDecorator('repassword', {
            rules: [{ required: true, message: '请输入password' }],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={submitFormResigster}>
            Submit
          </Button>
        </Form.Item>
      </Form> */}
    </>
  );
};

export default connect(({ drag }) => ({
  currentView: drag.currentView,
}))(Form.create()(login));
