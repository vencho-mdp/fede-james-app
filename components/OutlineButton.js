export default function OutlineButton({ text, onClick, className }) {
  const classNames =
    "border border-gray-200 text-white bg-black rounded-xl px-2 py-0.5 font-light" +
    (className ? ` ${className}` : "");
  return (
    <button onClick={onClick} className={classNames}>
      {text}
    </button>
  );
}
