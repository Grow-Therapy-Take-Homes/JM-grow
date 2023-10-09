import styles from "./select.module.css";

interface SelectProps<T> {
  items: T[];
  value: T;
  onClick: (value: T) => void;
}

export const Select = <T extends string | number>({
  items,
  value,
  onClick,
}: SelectProps<T>) => {
  return (
    <div className={styles.Select}>
      {items.map((item: T) => (
        <div
          key={item}
          className={`${styles.SelectItem} ${
            value === item ? styles.SelectItemSelected : ""
          }`}
          onClick={() => onClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
