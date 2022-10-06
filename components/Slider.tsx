import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styles from "./Slider.module.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import { useState } from "react";

type SliderData = {
  title: string;
  description: string;
  imageUrl: string;
};

type Props = {
  data: SliderData[];
};

const Slider = (props: Props) => {
  const { data } = props;
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNext = () => {
    setSlideIndex((x) => x + 1);
  };

  return (
    <div className={styles.slider}>
      <Carousel
        showArrows={false}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        selectedItem={slideIndex}
        swipeable={true}
        onChange={(res) => {
          setSlideIndex(res);
        }}
        emulateTouch={true}
      >
        {data.map((slider, i) => (
          <SliderContent
            key={i}
            title={slider.title}
            description={slider.description}
            imageUrl={slider.imageUrl}
          />
        ))}
      </Carousel>

      <div className={styles.actionsContainer}>
        <SliderDots
          length={data.length}
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
        />
        <div className={styles.nextButton} onClick={handleNext}>
          <span>{slideIndex === data.length - 1 ? "Start" : "Next"}</span>
          <span className={styles.nextButtonIcon}>▸</span>
        </div>
      </div>
    </div>
  );
};

const SliderContent = (props: SliderData) => {
  const { title, description, imageUrl } = props;

  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <Image src={imageUrl} width="300" height="180" />
      </div>
      <div className={styles.text}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

type SliderDotsProps = {
  length: number;
  slideIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SliderDots = (props: SliderDotsProps) => {
  const { length, slideIndex, setSlideIndex } = props;

  return (
    <div className={styles.dotsContainer}>
      {[...Array(length)].map((e, i) => (
        <div
          key={i}
          className={`${styles.dot} ${slideIndex === i && styles.dotActive}`}
        ></div>
      ))}
    </div>
  );
};

export default Slider;
