interface ButtonProps {
  title: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: any) => void;
  className?: string;
  fullwidth?: boolean;
  iconBack?: JSX.Element;
  iconFront?: JSX.Element;
  disabled?: boolean;
}

const Button = ({
  title,
  type,
  onClick,
  className,
  fullwidth,
  iconBack,
  iconFront,
  disabled,
}: ButtonProps) => {
  className = `p-1 mb-6 md:m-1 w-36 font-bold text-white bg-orange-500 border border-orange-700 rounded-xl hover:border-orange-800 hover:bg-orange-800 [&>*]:inline  ${className}`;
  fullwidth ? (className = `${className} w-full`) : (className = className);

  return (
    <button
      disabled={disabled}
      type={type}
      className={className}
      onClick={onClick}
    >
      {iconBack}
      {title.toUpperCase()}
      {iconFront}
    </button>
  );
};

export default Button;
