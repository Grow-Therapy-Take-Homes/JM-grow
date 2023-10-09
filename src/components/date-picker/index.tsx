import { Calendar } from "primereact/calendar";

import styles from "./date-picker.module.css";
import "primereact/resources/themes/saga-green/theme.css";

interface DatePickerProps {
  onChange: (date: Date) => void;
  value: Date;
}

export const DatePicker = ({ onChange, value }: DatePickerProps) => {
  return (
    <div className={styles.DatePicker}>
      <Calendar
        maxDate={new Date()}
        value={value}
        panelStyle={{ borderRadius: "1rem" }}
        onChange={(e) => onChange(e.value)}
        inline
      />
    </div>
  );
};
