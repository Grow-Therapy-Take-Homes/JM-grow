import styles from "./page-header.module.css";

interface PageHeaderProps {
  title: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => {
  return <h1 className={styles.PageHeader}>{title}</h1>;
};
