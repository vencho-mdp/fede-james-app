export default function Subtitle({ text, className }) {
  const classNames = `text-2xl text-gray-200 text-center font-medium ${
    className || ""
  }`;
  return <h2 className={classNames}>{text}</h2>;
}
