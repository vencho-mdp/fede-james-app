import Fade from "./Fade";
export default function Paragraph({ text, className }) {
  const classNames = `text-base text-gray-200 text-justify leading-loose ${
    className || ""
  }`;

  return (
    <Fade>
      <div
        className={classNames}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </Fade>
  );
}
