import Image from "next/image";

const IntroSection = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gri p-20">
      <div>
        <h1 className="text-[80px] text-center font-extrabold text-white">
          İVO BİO İLE TANIŞIN
        </h1>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div>
          <Image
            src="/del1.jpg"
            alt="logo"
            width={600}
            height={600}
            className="rounded-3xl shadow-2xs "
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-6xl text-center font-extrabold text-white">
            Doğayı Dinle
          </h1>
          <p className="text-4xl  select-none ">
            Eşsiz Tasarimla Doğayla İç İçe Bir Yaşam
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div>
          <h1 className="text-2xl text-center font-extrabold text-white">
            Doğayı Dinle
          </h1>
          <p>Eşsiz Tasarimla Doğayla İç İçe Bir Yaşam</p>
        </div>
        <div>
          <Image
            src="/del1.jpg"
            alt="logo"
            width={400}
            height={400}
            className="rounded-2xl shadow-2xs "
          />
        </div>
      </div>
      {/* <div className="flex justify-center items-center">
        <div>
          <Image
            src="/del1.jpg"
            alt="logo"
            width={400}
            height={400}
            className="rounded-2xl shadow-2xs "
          />
        </div>
        <div>
          <h1 className="text-2xl text-center font-extrabold text-white">
            Doğayı Dinle
          </h1>
          <p>Eşsiz Tasarimla Doğayla İç İçe Bir Yaşam</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div>
          <h1 className="text-2xl text-center font-extrabold text-white">
            Doğayı Dinle
          </h1>
          <p>Eşsiz Tasarimla Doğayla İç İçe Bir Yaşam</p>
        </div>
        <div>
          <Image
            src="/del1.jpg"
            alt="logo"
            width={400}
            height={400}
            className="rounded-2xl shadow-2xs "
          />
        </div>
      </div> */}
    </div>
  );
};

export default IntroSection;
