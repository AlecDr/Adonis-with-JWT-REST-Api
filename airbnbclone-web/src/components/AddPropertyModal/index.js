import React from "react";
import api from "../../api";
import Modal from "react-responsive-modal";
import styles from "./styles.module.css";
import { ScaleLoader } from "react-spinners";

export default props => {
  const [loading, setLoading] = React.useState(false);

  let renderContent = () =>
    !loading ? (
      <div className={styles.contentContainer}>
        <h2>Now fill the form!</h2>
      </div>
    ) : (
      <ScaleLoader height={35} width={4} radius={2} margin="2px" />
    );

  let addProperty = async () => {};

  return (
    <Modal
      classNames={{ modal: styles.modal, closeIcon: styles.closeIcon }}
      center
      onClose={props.onClose}
      open={props.open}
    >
      <div className={styles.container}>{renderContent()}</div>
    </Modal>
  );
};
