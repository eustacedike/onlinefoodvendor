



import styles from './alert.module.css';

// const remove = () => { document.getElementById('alert').style.display = "none" };

export default function Alert({ strong, message, bgColor, hrColor }) {



  return (
    <div className={styles.alertContainer} style={{background: bgColor}}>
      <div className={styles.alert}>
        {/* <span className={styles.closebtn} onClick={remove}>&times;</span> */}
        <strong>{strong}</strong> {message}
        <hr style={{border: `1px solid ${hrColor}`}} />
      </div>
    </div>

  );
}


