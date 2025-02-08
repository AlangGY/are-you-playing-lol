interface TeamTableProps {
  teamName: string;
  colorVariant: "blue" | "red";
  children: React.ReactNode;
}

export function TeamTable({
  teamName,
  colorVariant,
  children,
}: TeamTableProps) {
  return (
    <div className="">
      <div
        className={`text font-bold border-b border-[#333] pb-2 ${
          colorVariant === "blue" ? "text-blue-500" : "text-red-500"
        }`}
      >
        팀: {teamName}
      </div>
      {children}
    </div>
  );
}
