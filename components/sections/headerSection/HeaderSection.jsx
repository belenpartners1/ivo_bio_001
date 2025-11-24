import Image from "next/image";

const HeaderSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="/headerImage.webp"
        alt="header"
        fill
        className="object-cover rounded-b-4xl p-2"
      />
      <div className="absolute top-28 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[160px] font-extrabold text-gri select-none">
          İVO BİO
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
