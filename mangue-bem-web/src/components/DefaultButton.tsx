interface DefaultButtonProps {
  text: string;
  type?: "submit" | "reset" | "button";
  width?: string;
  onClick?: () => void;
  cssClass?: string;
}

const DefaultButton = ({
  text = "button",
  type,
  width = "w-full ",
  onClick,
  cssClass = "rounded-md my-3",
}: DefaultButtonProps) => {
  return (
    <button
      type={type}
      className={`${width} ${cssClass} bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 ease-in hover:bg-pink-700 hover:shadow-lg  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
