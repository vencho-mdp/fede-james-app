import Image from "next/dist/client/image";
import Subtitle from "./Subtitle";
import { createRef, useState } from "react";
import Fade from "./Fade";

export default function Slider({
  imagesPath,
  title,
  className,
  onImageChange = () => {},
  sliderWidth = "w-11/12",
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const refs = imagesPath.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentImage(i);
    onImageChange(i);
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
    <Fade>
      {" "}
      <div className={className || ""}>
        {title && <Subtitle text={title} className="mt-12 mb-12" />}
        <div className="flex items-center justify-center">
          <div
            className={
              "relative max-w-md flex items-center justify-center" +
              ` ${sliderWidth}`
            }
          >
            <div
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
                  className="w-full flex-shrink-0 grid place-items-center"
                  key={img.src}
                  ref={refs[i]}
                >
                  <Image
                    src={img.src}
                    height={170}
                    width={220}
                    alt="Imagen"
                    className="!border !border-white first-line:selection:w-full object-cover rounded-md"
                  />
                  {img.label && (
                    <p className="text-white font-medium text-lg mt-4">
                      {" "}
                      {img.label}{" "}
                    </p>
                  )}
                </div>
              ))}
              {sliderControl()}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
