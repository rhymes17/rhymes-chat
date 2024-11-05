const Input = ({
  type,
  placeholder,
  value,
  onInputChange,
  rightIcon,
}: {
  type: string;
  placeholder: string;
  value: string | number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between gap-2 items-center border-[0.09rem] border-black rounded-md px-3">
      <div className="flex items-center flex-1">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
          className="w-full h-12 outline-none"
        />
      </div>

      {rightIcon && rightIcon}
    </div>
  );
};

export default Input;
