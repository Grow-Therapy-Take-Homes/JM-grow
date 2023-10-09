import { faCalendar, faListUl } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DatePicker } from "../date-picker";
import { DateObject, getDate, getDateString } from "../../utils/date-utils";
import { Dropdown } from "../dropdown";
import { Select } from "../select";
import { RESULT_STEPS } from "../../constants/result-steps";

import styles from "./search-bar.module.css";

interface SearchBarProps {
  handleSearch: (date: DateObject, results: number) => void;
  startDate: number;
}

export const SearchBar = ({ handleSearch, startDate }: SearchBarProps) => {
  const [date, setDate] = useState(getDateString(startDate));
  const [results, setResults] = useState(100);

  const handleDateChange = (date: string | Date) => {
    setDate(getDateString(date));
  };

  const handleSubmit = () => {
    handleSearch(getDate(date), results);
  };

  const handleChangeResults = (value: number) => {
    setResults(value);
  };

  return (
    <div className={styles.SearchBar}>
      <div className={styles.SearchBarWrapper}>
        <div className={styles.SearchBarDropDowns}>
          <Dropdown
            icon={
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ color: "var(--site-dark-green)" }}
              />
            }
            iconBackground={"var(--site-light-green)"}
            value={date}
            label={"DATE"}
          >
            <DatePicker onChange={handleDateChange} value={new Date(date)} />
          </Dropdown>
          <div className={styles.SearchBarDivider}></div>
          <Dropdown
            icon={
              <FontAwesomeIcon
                icon={faListUl}
                style={{ color: "var(--site-dark-orange)" }}
              />
            }
            iconBackground={"var(--site-light-orange)"}
            value={results}
            label={"NUM RESULTS"}
          >
            <Select
              items={RESULT_STEPS}
              onClick={handleChangeResults}
              value={results}
            />
          </Dropdown>
        </div>
        <button className={styles.SearchBarButton} onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};
