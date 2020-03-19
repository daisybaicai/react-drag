import React, { useEffect, useState } from 'react';
import styles from './home.less'
import classNames from 'classnames';
import ComponentList from '../components/ComponentList';
import DragCanvas from '../components/DragCanvas';
import ComponentConfig from '../components/ComponentConfig';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

const IndexView = (props) => {
  const { dispatch } = props;
  const [comListHidden, setComListHidden] = useState(false)

  /**
   * @description 左边切换的事件，是否显示componentList
   */
  const toggleComponentList = () => {
    setComListHidden(!comListHidden)
  }

  const cls = classNames(styles.ComponentList, {
    [styles.hidden]: comListHidden === true,
  })

  /**
   * @description 生成预览代码
   */
  const CodePreview = () => {
    dispatch(routerRedux.push('/codePreview'));
  }

  return (
    <div className={styles.container}>
      <div className={styles.LeftContainer}>
        <div className={styles.header}>
          <div className={styles.btnList}>
            <div onClick={CodePreview}>生成代码预览</div>
            <div className={styles.btn}>预览</div>
            <div className={styles.btn}>保存</div>
            <div className={styles.btn}>全屏</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.settings}>
            <span onClick={toggleComponentList}>按钮</span>
          </div>
          <div className={styles.editRegion}>
            <div className={cls}>
              <ComponentList />
            </div>
            <div className={styles.dragRegion}>
              <DragCanvas />
            </div>
          </div>
        </div>
        <div className={styles.footer}>底部</div>
      </div>
      <div className={styles.RightContainer}>
        <div>属性编辑区</div>
        <ComponentConfig />
      </div>
    </div>
  );
}

export default connect()(IndexView);
