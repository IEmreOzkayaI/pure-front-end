import React from "react";
import styles from "./style.module.scss";

const DataTable = (props) => {
  const { text } = props;
  return <div className={styles.data__table__container}>{text}</div>;
};
export default DataTable;
