import React from "react";

interface StatsContainerProps {
  children: React.ReactNode;
  projectName: string;
}

const StatsContainer: React.FC<StatsContainerProps> = ({
  children,
  projectName,
}) => {
  return (
    <div className="relative flex h-24 items-center justify-between  bg-black px-10 text-4xl text-white">
      <span className="justify-self-end text-7xl font-bold">{projectName}</span>
      <div className="flex py-2">{children}</div>
    </div>
  );
};

export default StatsContainer;
