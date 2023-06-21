import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label: string;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  labelClassName?: string;
  onChange?: (e: any) => void;
  value?: string | number;
  className?: string;
  error?: string;
  disabled?: boolean;
  divclass?: string;
}

const Input = ({
  label,
  type,
  name,
  id,
  placeholder,
  onChange,
  value,
  className,
  error,
  disabled,
  divclass,
}: InputProps) => {
  const [hover, setHover] = useState(false);
  const [showPassorwd, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const changePasswordVisibility = () => setShowPassword(!showPassorwd);

  return (
    <div className={divclass}>
      <div
        className={`m-2 relative ${className} `}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onFocus={() => {
          setIsActive(true);
        }}
        onBlur={() => {
          setIsActive(false);
        }}
      >
        <span
          className={
            value || isActive || hover || type === "date"
              ? "bottom-8 pl-3 absolute"
              : "pl-3 bottom-2.5 absolute"
          }
        >
          <label className="font-semibold text-orange-700 bg-white border-0 rounded-2xl px-2">
            {label}
          </label>
        </span>
        <input
          type={"password" ? (showPassorwd ? "text" : type) : type}
          name={name}
          id={id}
          className={`block w-full border rounded-xl p-2 focus-visible:outline-none border-orange-500 focus:border-orange-700 focus:border-2 ${
            error
              ? "border-2 border-rose-600 focus:border-rose-600 focus:border-rose-600"
              : ""
          }`}
          placeholder={placeholder ? placeholder : ""}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        <button
          type="button"
          className="absolute right-3 bottom-3 text-xl"
          onClick={changePasswordVisibility}
        >
          {type === "password" ? (
            showPassorwd ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )
          ) : null}
        </button>
      </div>
      <p className="pl-4 text-rose-600 text-xs">{error ? error : ""}</p>
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  label: "",
  id: "",
  name: "",
  onChange: null,
  value: null,
  className: "",
  error: "",
  disabled: false,
};

export default Input;
