interface StatContainerItemProps {
  count: string;
  description: string;
}
const StatContainerItem = ({ count, description }: StatContainerItemProps) => {
  return (
    <div className="mr-1.5 flex w-28 flex-col items-center justify-center border-l-4 border-white px-5 hover:bg-green-700">
      <span>{count}</span>
      <span>{description}</span>
    </div>
  );
};

export default StatContainerItem;
