export default function Dropdown({
  name,
  options,
  onChange,
  isActive,
  className,
  padding = true,
}) {
  const classNames =
    "flex items-center" + (padding ? " p-2 mb-1" : "") + isActive
      ? " flex flex-col justify-center items-start"
      : null;

  const selectClassNames =
    className + " bg-black text-gray-200 focus:outline-none w-24";
  return (
    <div className={classNames}>
      <select className={selectClassNames} onChange={onChange} value={name}>
        <option hidden>
          {" "}
          {`${name?.[0].toUpperCase() || ""}${name?.slice(1) || ""}`}{" "}
        </option>
        {options.map((el) => (
          <option key={el}>{`${el?.[0].toUpperCase() || ""}${
            el?.slice(1) || ""
          }`}</option>
        ))}
      </select>
      {isActive && (
        <div className="border-gray-200 border-b-2 !h-1 w-3/4 ml-1" />
      )}
    </div>
  );
}
