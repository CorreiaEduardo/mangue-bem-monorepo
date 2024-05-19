interface DefaultButtonProps {
  text: string;
  type?: "submit" | "reset" | "button";
  width?: string;
}

const DefaultButton = ({
  text = "button",
  type,
  width = "w-full ",
}: DefaultButtonProps) => {
  return (
    <button
      type={type}
      className={`my-3 ${width} rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 ease-in hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg hover:shadow-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
