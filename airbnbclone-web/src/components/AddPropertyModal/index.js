import React, { useEffect } from "react";
import Modal from "react-responsive-modal";
import Dropzone from "react-dropzone";
import styles from "./styles.module.css";
import { ScaleLoader } from "react-spinners";
import api from "../../api";

export default props => {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [images, setImages] = React.useState([]);

  const thumbs = images.map(file => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img alt="" src={file.preview} className={styles.img} />
      </div>
    </div>
  ));

  let resetModal = () => {
    setLoading(false);
    setImages([]);
    setTitle("");
    setAddress("");
    setPrice("");
  };

  let addProperty = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const { lat, lng } = props.markerPosition;

        const data = {
          token: props.userToken,
          address,
          title,
          price,
          latitude: lat,
          longitude: lng
        };

        const result = await api.post("/properties", data);

        if (images.length) {
          const id = result.data.property.id;

          let picturesData = new FormData();

          picturesData.append("token", props.userToken);

          images.map((image, index) => {
            picturesData.append(`image`, image);
          });

          await api.post(`/properties/${id}/images/store`, picturesData);
        }

        resetModal();
        props.onSuccess();
      } catch (error) {
        setLoading(false);
        console.log(error.message);
        setMessage("Something went wrong, try again later!");
      }
    }
  };

  let validateForm = () => {
    setMessage("");

    if (title.trim().length && address.trim().length && price > 0) {
      return true;
    } else {
      setMessage("Please provide valid informations!");
      return false;
    }
  };

  let renderMessage = () =>
    message ? <p className={styles.error}>{message}</p> : null;

  let renderContent = () =>
    !loading ? (
      <div className={styles.contentContainer}>
        <h2>Now fill the form!</h2>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Title</label>
          <input
            onChange={event => setTitle(event.target.value)}
            value={title}
            type="text"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Address</label>
          <input
            onChange={event => setAddress(event.target.value)}
            value={address}
            type="text"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Price</label>
          <input
            onChange={event => setPrice(event.target.value)}
            value={price}
            type="number"
            className={styles.input}
          />
        </div>
        <Dropzone
          onDrop={files => {
            setImages(
              files.map(file =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file)
                })
              )
            );
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <aside className={styles.thumbsContainer}>{thumbs}</aside>
            </section>
          )}
        </Dropzone>
        {renderMessage()}
        <button
          onClick={addProperty}
          type="button"
          className={[styles.button, styles.registerButton].join(" ")}
        >
          Add property
        </button>
      </div>
    ) : (
      <ScaleLoader height={35} width={4} radius={2} margin="2px" />
    );

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
