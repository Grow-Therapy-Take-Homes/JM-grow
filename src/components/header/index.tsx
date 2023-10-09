import { Logo } from "../icons/logo";

import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.Header}>
      <span>
        <Logo />
      </span>
    </div>
  );
};
