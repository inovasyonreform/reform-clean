"use client";

import { BackgroundBeams } from "../ui/background-beams";


export function AboutEvent() {
  return (
    <div className="h-160 w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Reform İnovasyon Yapı
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime quod
          consequatur doloremque quidem aperiam autem fugit sed! Maiores alias
          sunt, quia debitis commodi aliquid corporis quo earum provident
          repellat. Rerum!
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default AboutEvent;
