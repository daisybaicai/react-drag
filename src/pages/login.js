import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import styles from './login.less';
import { Link } from 'umi';

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logForm}>
          <h2>登陆</h2>
          <div className={styles.form}>
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
              <Form.Item label="用户名">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入username' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入password' }],
                })(<Input.Password />)}
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                onClick={submitForm}
                className={styles.btn}
              >
                登陆
              </Button>
              <Link to="/register" className={styles.link}>
                注册
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(({ drag }) => ({
  currentView: drag.currentView,
}))(Form.create()(login));
