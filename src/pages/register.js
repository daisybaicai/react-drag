import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import styles from './login.less';
import { Link } from 'umi';

const login = props => {
  const { form, dispatch } = props;
  const { getFieldDecorator } = form;

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
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>react-drag 前端可视化构建平台</h2>
        </div>
        <div className={styles.logForm}>
          <h2>注册</h2>
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
              <Form.Item label="再次输入密码">
                {getFieldDecorator('repassword', {
                  rules: [{ required: true, message: '请输入password' }],
                })(<Input.Password />)}
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                onClick={submitFormResigster}
                className={styles.btn}
              >
                注册
              </Button>
              <Link to="/login" className={styles.link}>
                登陆
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
