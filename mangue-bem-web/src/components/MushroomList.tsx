import MushroomCard from "./MushroomCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface MushroomListProps {
  mushroomPages: any;
  getMushroom: () => void;
  isFetchingNextPage: boolean;
}

const MushroomList = ({
  mushroomPages,
  getMushroom,
  isFetchingNextPage,
}: MushroomListProps) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.9,
  });
  useEffect(() => {
    if (inView) console.log(getMushroom());
  }, [inView]);

  console.log(inView);

  return (
    <div className="mx-16 my-10 rounded-2xl bg-gray-200/50 p-6">
      <div className="flex flex-row-reverse"></div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mushroomPages?.map((page: any) =>
          page?.content?.map((mushroom: any) => (
            <li key={mushroom.id}>
              <MushroomCard {...mushroom} />
            </li>
          )),
        )}
      </ul>
      {isFetchingNextPage ? <LoadingSpinner /> : <div ref={ref}></div>}
    </div>
  );
};

export default MushroomList;
