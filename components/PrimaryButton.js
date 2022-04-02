export default function PrimaryButton({ text, onClick, className, disabled }) {
  const classNames =
    "border border-gray-500 text-black rounded-xl text-base px-3 py-1 font-medium bg-white" +
    (className ? ` ${className}` : "") +
    (disabled ? " opacity-50 cursor-not-allowed" : "");
  return (
    <button disabled={disabled} onClick={onClick} className={classNames}>
      {text}
    </button>
  );
}
