import styles from "./error.module.css";

interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => {
  return (
    <div className={styles.Error}>
      <span>{message}</span>
    </div>
  );
};
