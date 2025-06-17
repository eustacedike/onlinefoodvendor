import styles from './loading.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
