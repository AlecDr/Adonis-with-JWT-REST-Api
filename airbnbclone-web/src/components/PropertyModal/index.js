import React, { useEffect } from "react";
import api from "../../api";
import Modal from "react-responsive-modal";
import styles from "./styles.module.css";
import Slider from "react-slick";
import "react-image-gallery/styles/css/image-gallery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ScaleLoader } from "react-spinners";

export default props => {
  const [property, setProperty] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetchProperty();
  }, []);

  let fetchProperty = async () => {
    try {
      const id = props.selectedProperty;
      const response = await api.get(`/properties/${id}`, {
        params: {
          token: props.userToken
        }
      });

      const property = defineImageList(response.data);
      setProperty(property);

      console.log(property);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  let defineImageList = property => {
    const url = `${api.defaults.baseURL}/images/`;
    const updatedProperty = { ...property };

    updatedProperty.images = updatedProperty.images.map(images => {
      return {
        url: url + images.path
      };
    });

    return updatedProperty;
  };

  let renderImagesCarousel = () => {
    let settings = {
      dots: true,
      infinite: false,
      centerMode: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      adaptiveHeight: true,
      variableWidth: true
    };

    return property.images.length ? (
      <div className={styles.imagesContainer}>
        <p className={styles.sectionTitle}>Images</p>
        <Slider {...settings}>
          {property.images.map((image, index) => (
            <img className={styles.image} key={index} src={image.url} alt="" />
          ))}
        </Slider>
      </div>
    ) : null;
  };

  let renderContent = () =>
    loading ? (
      renderSpinner()
    ) : (
      <div className={styles.contentContainer}>
        <p className={styles.propertyTitle}>{property.title}</p>

        {renderImagesCarousel()}
        <p className={styles.sectionTitle}>Address</p>
        <p className={styles.propertyAddress}>{property.address}</p>
        <p className={styles.sectionTitle}>Price</p>
        <p className={styles.propertyAddress}>$ {property.price}</p>
      </div>
    );

  let renderSpinner = () => (
    <div className={styles.spinnerContainer}>
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
      <div className={styles.container}>{renderContent()}</div>
    </Modal>
  );
};
