import React from "react";
import Modal from "react-responsive-modal";
import styles from "./styles.module.css";

export default props => {
  const [property, setProperty] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  let renderContent = () => (loading ? renderSpinner() : <p>Content</p>);
  let renderSpinner = () => <p>Loading...</p>;

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
