import Image from "next/image";

const AdvertiseHeader = () => {
  return (
    <div className="w-full flex flex-col fixed top-0 z-50">
      {/* <div className="bg-yesil h-16 text-center flex justify-center items-center">
        <p className="text-sari">Advertise Header Component</p>
      </div> */}
      <div className="w-full">
        <div className=" flex justify-between items-center p-6">
          <div className="bg-white/10 backdrop-blur-xl shadow-lg rounded-3xl border border-white/20 ">
            <Image
              src="/ivo_bio_logoSVG_v2.svg"
              alt="Picture of the author"
              width={160}
              height={160}
              className="px-4 py-2"
            />

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 752.31 238.1"
              className="w-20 h-20 text-black" // Tailwind ile rengi burada değiştir
            >
              <path
                d="M103.7,4.32c13.56.19,26.31,1.64,38.75,5.33,9.63,2.86,18.5,7.06,25.9,14.03,7.13,6.72,12.56,14.66,17.08,23.3,9.14,17.5,18.33,34.98,27.48,52.47,8.23,15.72,16.43,31.46,24.65,47.19,4.18,8.01,8.38,16,12.59,24,.21.4.3,1.01.86,1.05.71.05.84-.64,1.09-1.11,3.43-6.42,6.84-12.84,10.27-19.26,10.3-19.33,20.61-38.66,30.91-57.99,8.64-16.23,17.26-32.47,25.9-48.7,6.23-11.71,12.5-23.41,18.71-35.14.65-1.23,1.44-1.74,2.82-1.73,5.68.05,11.36,0,17.04.03,2.29,0,2.45.27,1.38,2.29-4.26,8.05-8.56,16.09-12.84,24.14-9.73,18.27-19.47,36.55-29.2,54.82-9.74,18.27-19.49,36.53-29.22,54.81-11.23,21.1-22.44,42.21-33.67,63.31-4.17,7.83-8.39,15.64-12.5,23.5-.89,1.7-1.94,2.43-3.92,2.36-4.07-.16-8.16-.09-12.24-.02-1.48.03-2.3-.55-2.98-1.86-8.6-16.61-17.24-33.2-25.91-49.78-10.14-19.41-20.33-38.8-30.47-58.22-8.66-16.58-17.24-33.2-25.95-49.75-5.99-11.39-11.62-22.97-18.06-34.12-3.21-5.55-6.89-10.78-11.41-15.38-6.4-6.51-14.19-10.24-23.15-11.67-2.23-.36-2.23-.37-2.24-2.7,0-.88-.02-1.76,0-2.64.05-1.67.18-1.85,1.74-1.92,5.75-.24,11.5-.45,16.61-.65Z"
                fill="currentColor"
              />
            </svg> */}
          </div>

          <div className="bg-white/10 backdrop-blur-xl shadow-lg rounded-3xl border border-white/20 p-4 text-black">
            Yolculugumuz
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseHeader;
