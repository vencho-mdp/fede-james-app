export default function Dropdown({
  name,
  options,
  onChange,
  isActive,
  className,
  padding = true,
}) {
  const classNames = "flex items-center" + (padding ? " p-2 mb-1" : "");
  const selectClassNames =
    className + " bg-black text-white focus:outline-none w-24";
  return (
    <div className={classNames}>
      <select
        className={selectClassNames}
        onChange={onChange}
        defaultValue={name}
      >
        <option hidden> {name} </option>
        {options.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </select>
      {isActive && <div className="border-gray-200 border-b-2 mt-1 w-3/4" />}
    </div>
  );
}
