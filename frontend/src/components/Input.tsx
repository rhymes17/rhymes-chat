import { CSSProperties } from "react";

const Input = ({
  type,
  placeholder,
  value,
  onInputChange,
  rightElement,
  styleProps,
}: {
  type: string;
  placeholder: string;
  value: string | number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
  styleProps?: CSSProperties;
}) => {
  return (
    <div
      style={styleProps}
      className="flex justify-between gap-2 w-full items-center border-[0.09rem] border-black rounded-md px-3"
    >
      <div className="flex items-center flex-1 w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
          className="w-full h-12 outline-none"
        />
      </div>

      {rightElement && rightElement}
    </div>
  );
};

export default Input;
