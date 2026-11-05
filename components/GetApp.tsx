import Image from 'next/image';
import Button from './Button';

const GetApp = () => {
  return (
    <section className="flexCenter w-full flex-col pb-[100px]">
      <div className="get-app">
        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[320px]">Get for free now!</h2>
          <p className="regular-16 text-gray-10">Available on iOS and Android</p>
          <div className="flex w-full flex-col gap-3 whitespace-nowrap xl:flex-row">
            <Button title="App Store" icon="/apple.svg" variant="btn_white" href="/app#download" full />
            <Button title="Play Store" icon="/android.svg" variant="btn_dark_green_outline" href="/app#download" full />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Image src="/phones.webp" alt="Hilink app screens" width={550} height={870} className="transition duration-700 hover:-translate-y-2 hover:rotate-1" />
        </div>
      </div>
    </section>
  );
};

export default GetApp;
