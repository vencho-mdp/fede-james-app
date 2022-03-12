import Image from "next/dist/client/image";
import Subtitle from "./Subtitle";
import { createRef, useState } from "react";
import Paragraph from "./Paragraph";

export default function Slider({ imagesPath, title, className }) {
  const [currentImage, setCurrentImage] = useState(0);

  const refs = imagesPath.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = imagesPath.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle =
    "absolute text-white text-2xl z-10 h-10 w-10 opacity-75 flex items-center justify-center";

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-1" : "right-1 rotate-180"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        <Image src="/images/chevron.svg" alt="Flecha" height="32" width="32" />
      </span>
    </button>
  );

  return (
    <div className={className || ""}>
      <Subtitle text={title} className="mt-12 mb-8" />
      <div className="relative w-full md:w-2/3 mx-auto flex justify-around">
        <div
          className="flex justify-center w-screen md:w-1/2 items-center"
          style={{
            display: "inline-flex",
            overflowX: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            MsOverflowStyle: "none",
          }}
        >
          {sliderControl(true)}
          {imagesPath.map((img, i) => (
            <div
              className="w-full flex mx-12 justify-center items-center flex-shrink-0"
              key={img.src}
              ref={refs[i]}
            >
              <div className="flex flex-col items-center justify-center max-w-max">
                <Image
                  src={img.src}
                  height="170"
                  width="220"
                  alt="Imagen"
                  className="rounded-sm"
                />
                {img.label && (
                  <p className="text-white font-medium text-lg mt-4">
                    {" "}
                    {img.label}{" "}
                  </p>
                )}
              </div>
            </div>
          ))}
          {sliderControl()}
        </div>
      </div>
    </div>
  );
}
