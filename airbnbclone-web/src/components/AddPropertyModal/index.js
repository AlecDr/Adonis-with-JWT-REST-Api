import React, { useEffect } from "react";
import Modal from "react-responsive-modal";
import Dropzone from "react-dropzone";
import styles from "./styles.module.css";
import { ScaleLoader } from "react-spinners";

export default props => {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [images, setImages] = React.useState([]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [images]
  );

  const thumbs = images.map(file => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img alt="" src={file.preview} className={styles.img} />
      </div>
    </div>
  ));

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
        <button
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
