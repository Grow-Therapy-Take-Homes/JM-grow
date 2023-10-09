import { ReactNode } from "react";

import { Header } from "../header";

import styles from "./layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.Layout}>
      <Header />
      <div className={styles.LayoutContent}>{children}</div>
    </div>
  );
};
