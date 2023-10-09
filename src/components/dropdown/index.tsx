import { useRef, useState } from "react";

import { useOutsideClick } from "../../hooks/use-outside-click";

import styles from "./dropdown.module.css";

interface DropdownProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  iconBackground: string;
  value: string | number;
}

export const Dropdown = ({
  icon,
  label,
  children,
  iconBackground,
  value,
}: DropdownProps) => {
  const dropdown = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(dropdown, () => setIsOpen(false));

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      ref={dropdown}
      className={`${styles.DropDown} ${isOpen ? styles.DropDownOpen : ""}`}
    >
      <div
        className={styles.DropDownWrapper}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <div
            className={styles.DropdownIcon}
            style={{ background: iconBackground }}
          >
            {icon}
          </div>
        </div>
        <div className={styles.DropDownInputWrapper}>
          <div className={styles.DropDownInputLabel}>
            <div>{label}</div>
            <div
              className={`${styles.DropDownCaret} ${
                isOpen ? styles.RotateCaret : ""
              }`}
            >
              &#8963;
            </div>
          </div>
          <input
            className={styles.DropDownInput}
            value={value}
            type="text"
            onKeyDown={handleEnter}
            readOnly
          />
        </div>
      </div>
      <div className={styles.DropDownView}>{isOpen ? children : null}</div>
    </div>
  );
};
