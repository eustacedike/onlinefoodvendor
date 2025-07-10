import styles from './orderstatus.module.css';
import { FaBoxOpen, FaTruckMoving, FaCheckCircle } from 'react-icons/fa';

export default function OrderStatus({ status }) {
  const steps = [
    { key: 'processing', label: 'Processing', icon: <FaBoxOpen /> },
    { key: 'enroute', label: 'En Route', icon: <FaTruckMoving /> },
    { key: 'delivered', label: 'Delivered', icon: <FaCheckCircle /> },
  ];

  const statusOrder = ['processing', 'enroute', 'delivered'];
  const currentIndex = statusOrder.indexOf(status.toLowerCase());

  return (
    <div className={styles.orderStatusContainer}>
      {steps.map((step, index) => {
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.key} className={styles.orderStep}>
            <div
              className={`${styles.orderIcon} ${isActive ? `${styles.active}` : ''} ${isCurrent ? `${styles.current}` : ''}`}
            >
              {step.icon}
              <span 
              className={`${styles.orderCenter} ${isCurrent && index !== steps.length - 1 ? `${styles.pulse}` : ''}`}
              ></span>
            </div>
            <span
              className={`${styles.orderLabel} ${isActive ? `${styles.active}` : ''} ${isCurrent ? `${styles.current}` : ''}`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`${styles.orderLine} ${index < currentIndex ? `${styles.fill}` : ''}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
