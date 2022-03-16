import Subtitle from "./Subtitle";
import Image from "next/image";
import OutlineButton from "./OutlineButton";
import { useRouter } from "next/router";

export default function Services({ items }) {
  const router = useRouter();
  return (
    <>
      <Subtitle text="Servicios" className="mt-24 mb-8" />
      <div className="flex flex-wrap justify-around items-center">
        {items.map((item) => (
          <div
            key={item.name}
            className="w-full md:w-80 px-12 flex flex-col items-center mb-10"
          >
            <Image
              alt={item.name}
              className="rounded-md flex-grow"
              src={item.src}
              width="220"
              height="170"
            />
            <OutlineButton
              text={item.name}
              className="mt-6"
              onClick={() => router.push(item.route)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
