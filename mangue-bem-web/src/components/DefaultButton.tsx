interface DefaultButtonProps {
  text: string;
  type?: "submit" | "reset" | "button";
  width?: string;
  animation?: boolean;
}

const DefaultButton = ({
  text = "button",
  type,
  width = "w-full ",
  animation = true,
}: DefaultButtonProps) => {
  return (
    <button
      type={type}
      className={`my-3 ${width} rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 ease-in  ${animation && "hover:-translate-y-0.5 hover:shadow-emerald-200"} hover:bg-pink-700 hover:shadow-lg  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
