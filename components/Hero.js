import Title from "./Title";
import Subtitle from "./Subtitle";
import Fade from "./Fade";

export default function Hero({ img, title, subtitle }) {
  return (
    <Fade>
      <div
        className="flex flex-col h-48 w-full justify-center items-center md:h-96"
        style={{
          backgroundImage: `linear-gradient(rgba(1,1,1,0.6), rgba(1,1,1,0.6)), url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Title text={title} />
        {subtitle && <Subtitle text={subtitle} bold={true} />}
      </div>
    </Fade>
  );
}
