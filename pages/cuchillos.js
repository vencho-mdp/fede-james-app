import Hero from "../components/Hero";
import { IgApiClient } from "instagram-private-api";
import Footer from "../components/Footer";
import https from "https";
import Subtitle from "../components/Subtitle";
import Slider from "../components/Slider";
import Form from "../components/Form";
import OutlineButton from "../components/OutlineButton";
import { useState } from "react";
import Paragraph from "../components/Paragraph";
import Image from "next/image";

export default function Cuchillos({ knives }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [showProductSpecificCard, setShowProductSpecificCard] = useState(false);
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
      {knives.map((imgSrc) => (
        <div key={imgSrc} className="py-8 px-16 h-96 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt="knife"
            className="h-full w-full object-cover rounded-md"
          />
        </div>
      ))}
      <Slider
        title="Categorías"
        imagesPath={imgs.map((el) => ({ src: el.src }))}
        onImageChange={(i) => setImgIndex(i)}
        className="mt-12 !mb-20"
      />
      {!showProductSpecificCard ? (
        <div className="flex w-full items-center justify-center">
          <OutlineButton
            onClick={() => setShowProductSpecificCard(true)}
            className="mt-12 mb-4"
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
  async function* feedToIterator(feed) {
    do {
      const items = await feed.items();
      yield items;
    } while (feed.isMoreAvailable());
  }

  async function* flatten(iter) {
    for await (const items of iter) {
      yield* items;
    }
  }

  async function* filter(iter, fn) {
    for await (const item of iter) {
      if (fn(item)) yield item;
    }
  }

  async function* take(iter, n) {
    if (n <= 0) return;
    let i = 0;
    for await (const item of iter) {
      yield item;
      i++;
      if (i >= n) break;
    }
  }

  async function toArray(iter) {
    const arr = [];
    for await (const item of iter) {
      arr.push(item);
    }
    return arr;
  }

  const getBase64Image = async (url) => {
    return new Promise((resolve, reject) => {
      if (!url) {
        resolve(null);
      }
      https
        .get(url, (resp) => {
          resp.setEncoding("base64");
          var body = "data:" + resp.headers["content-type"] + ";base64,";
          resp.on("data", (data) => {
            body += data;
          });
          resp.on("end", () => {
            resolve(body);
          });
        })
        .on("error", (e) => {
          reject(e.message);
        });
    });
  };
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  const userId = await ig.user.getIdByUsername("federico.james.platero");
  const userFeed = ig.feed.user(userId);
  const items = await toArray(
    take(
      filter(
        flatten(feedToIterator(userFeed)),
        (i) =>
          i?.caption?.text.includes("#" + process.env.KEY_HASHTAG) &&
          i.image_versions2?.candidates[0].url
      ),
      3
    )
  );

  return {
    props: {
      knives: await Promise.all(
        items.map((i) => getBase64Image(i.image_versions2?.candidates[0].url))
      ),
    },
    revalidate: 86400 * 7,
  };
}
