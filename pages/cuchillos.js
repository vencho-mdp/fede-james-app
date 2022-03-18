import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Subtitle from "../components/Subtitle";
import Slider from "../components/Slider";
import Form from "../components/Form";
import OutlineButton from "../components/OutlineButton";
import { useState, useEffect } from "react";
import Paragraph from "../components/Paragraph";
import Image from "next/image";

export default function Cuchillos({ knives }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [showProductSpecificCard, setShowProductSpecificCard] = useState(false);
  const [items, setItems] = useState([]);
  const [loadAll, setLoadAll] = useState(false);

  useEffect(() => {
    // lazy loaded
    // after render and 200ms
    // + api response is 3/4 secs
    const fetchItems = async () => {
      const { items } = await fetch("/api/photos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setItems(items);
    };
    fetchItems();
    return () => {
      setItems([]);
    };
  }, []);

  const imgs = [
    {
      src: "/images/main_knife.jpg",
      label: "Cuchillo Mariposa",
      description:
        "Cuchillo de mariposa de acero inoxidable con una lámina de acero inoxidable de alta resistencia.",
      imagesPath: [
        { src: "/images/main_knife.jpg" },
        { src: "/images/main_knife2.jpg" },
        { src: "/images/main_knife3.jpg" },
      ],
    },
    {
      src: "/images/family.png",
      label: "Cuchillo Torrpedo",
      description:
        "Cuchillo de mariposa de acero inoxidable con una lámina de acero inoxidable de alta resistencia.",
      imagesPath: [
        { src: "/images/main_knife.jpg" },
        { src: "/images/main_knife2.jpg" },
        { src: "/images/main_knife3.jpg" },
      ],
    },
    {
      src: "/images/logo.png",
      label: "Cuchillo Paez",
      description:
        "Cuchillo de mariposa de acero inoxidable con una lámina de acero inoxidable de alta resistencia.",
      imagesPath: [
        { src: "/images/main_knife.jpg" },
        { src: "/images/main_knife2.jpg" },
        { src: "/images/main_knife3.jpg" },
      ],
    },
  ];

  return (
    <main>
      <Hero title="Cuchillos" img="/images/main_knife.jpg" />
      <Paragraph
        className="mx-12 mt-16"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <Subtitle text="Últimos Trabajos" className="mt-16 mb-8" />
      {(loadAll ? items : knives).map((imgSrc) => (
        <div key={imgSrc} className="py-8 px-16 h-96 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/jpeg;base64,${imgSrc}`}
            alt="knife"
            className="h-full w-full object-cover rounded-md"
          />
        </div>
      ))}

      {!loadAll && (
        <div className="w-full flex items-center justify-center">
          <OutlineButton
            onClick={() => setLoadAll(true)}
            className="mt-4 mb-8 mx-auto"
            text="Cargar más"
          />
        </div>
      )}
      <Slider
        title="Categorías"
        imagesPath={imgs.map((el) => ({ src: el.src }))}
        onImageChange={(i) => setImgIndex(i)}
        className="mt-12"
      />
      {!showProductSpecificCard ? (
        <div className="flex w-full items-center justify-center">
          <OutlineButton
            onClick={() => setShowProductSpecificCard(true)}
            className="mt-12 mb-8"
            text={`Ver más del ${imgs[imgIndex].label}`}
          />
        </div>
      ) : (
        <div className="border-2 border-gray-200 p-1 mx-4 my-12 flex flex-col items-center justify-around rounded-md">
          <div className="w-full flex items-center justify-end px-2 pt-2">
            <Image
              alt="Cerrar"
              src="/images/close.svg"
              width={24}
              onClick={() => setShowProductSpecificCard(false)}
              height={24}
            />
          </div>
          <Subtitle text={imgs[imgIndex].label} className="mt-4" />
          <Paragraph text={imgs[imgIndex].description} className="mx-4 my-10" />
          <div className="flex justify-center w-full items-center mb-8">
            <Slider
              sliderWidth="w-11/12"
              imagesPath={imgs[imgIndex].imagesPath}
            />
          </div>
        </div>
      )}

      <Form />
      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const { items } = await fetch(process.env.BASE_URL + "/api/photos?limit=2", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return {
    props: {
      knives: items,
    },
    revalidate: 86400,
  };
}
