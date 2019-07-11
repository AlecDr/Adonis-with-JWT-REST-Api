import React from "react";
import Modal from "react-responsive-modal";
import styles from "./styles.module.css";
import { ScaleLoader } from "react-spinners";

export default props => {
  const [property, setProperty] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  let renderContent = () => (loading ? renderSpinner() : <p>Content</p>);
  let renderSpinner = () => (
    <div className={styles.spinnerContanainer}>
      <ScaleLoader height={35} width={4} radius={2} margin="2px" />
    </div>
  );

  return (
    <Modal
      classNames={{ modal: styles.modal, closeIcon: styles.closeIcon }}
      center
      onClose={props.onClose}
      open={props.open}
    >
      {renderContent()}
    </Modal>
  );
};
