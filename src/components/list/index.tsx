import styles from "./list.module.css";

interface ListProps<T> {
  items: Array<T>;
  style?: { [key: string]: string };
  renderView: (item: T) => JSX.Element;
}

export const List = <T extends object>({
  items,
  style = {},
  renderView,
}: ListProps<T>) => {
  return (
    <ul className={styles.List} style={style}>
      {items.map((item, i) => (
        <li key={i}>{renderView(item)}</li>
      ))}
    </ul>
  );
};
