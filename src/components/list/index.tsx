import { useAutoAnimate } from "@formkit/auto-animate/react";
import styles from "./list.module.css";
import { useEffect } from "react";

// would rather use an id but the api doesn't provide one
interface ListProps<T extends { article: string }> {
  items: Array<T>;
  emptyMessage: string;
  enableAnimations?: boolean;
  style?: { [key: string]: string };
  renderView: (item: T) => JSX.Element;
}

export const List = <T extends { article: string }>({
  items,
  emptyMessage,
  enableAnimations = false,
  style = {},
  renderView,
}: ListProps<T>) => {
  const [parent, setEnabled] = useAutoAnimate();

  useEffect(() => {
    setEnabled(enableAnimations);
  }, [enableAnimations, setEnabled]);

  return (
    <ul className={styles.List} style={style} ref={parent}>
      {items.length ? (
        items.map((item) => <li key={item.article}>{renderView(item)}</li>)
      ) : (
        <li key={"empty:message"} className={styles.ListEmptyMessage}>
          {emptyMessage}
        </li>
      )}
    </ul>
  );
};
