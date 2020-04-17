import styles from './letter.less';

const Letter = props => {
  return (
    <>
      <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          <img
            className={styles.left}
            src="https://cdn2.hubspot.net/hubfs/322787/Mychefcom/images/BLOG/Header-Blog/photo-culinaire-pexels.jpg"
          />
        </div>
        <div className={styles.right}>
          <h1>申请信</h1>
          <div className={styles.author}>
            <h2>koa2</h2>
          </div>
          <div className={styles.separator}></div>
          <p>
            你好。
          </p>
          <p>
            希望能加入您的组织并获得通过，一起学习，一起进步，一起等风来，谢谢厚爱！！！
          </p>
          <p>
          Hope to join your organization and get through, learn together, progress together, wait for the wind together, thank you for your love! ! !
          </p>
        </div>
        <h5>12</h5>
        <h6>JANUARY</h6>
        <div className={styles.fab}>
          {/* <i className={stylesfa fa-arrow-down fa-3x> </i> */}
          回复
        </div>
      </div>
      </div>
    </>
  );
};

export default Letter;
