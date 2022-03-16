import { useRouter } from "next/router";
import Hero from "../../components/Hero";
import Slider from "../../components/Slider";
import Paragraph from "../../components/Paragraph";
import Form from "../../components/Form";
import Footer from "../../components/Footer";

const data = [
  {
    text: "afilado",
    name: "Afilación",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    images_path: [
      "/images/main_knife.jpg",
      "/images/main_knife2.jpg",
      "/images/main_knife3.jpg",
    ],
    main_image: "/images/main_knife.jpg",
  },
  {
    text: "restauracion",
    name: "Restauración",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    images_path: [
      "/images/main_knife.jpg",
      "/images/main_knife2.jpg",
      "/images/main_knife3.jpg",
    ],
    main_image: "/images/main_knife.jpg",
  },
  {
    text: "revitalizacion",
    name: "Revitalización",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    images_path: [
      "/images/main_knife.jpg",
      "/images/main_knife2.jpg",
      "/images/main_knife3.jpg",
    ],
    main_image: "/images/main_knife.jpg",
  },
];

export default function Service() {
  const router = useRouter();
  const { service } = router.query;
  if (service) {
    const { name, main_image, description, images_path } = data.find(
      (item) => item.text === service
    );
    return (
      <main>
        <Hero title={name} img={main_image} />
        <Slider
          title={`Últimos trabajos`}
          imagesPath={images_path.map((el) => ({ src: el }))}
        />
        <Paragraph text={description} className="mx-12 my-16" />
        <Form />
        <Footer />
      </main>
    );
  }
  return (
    <div className="flex h-full w-full justify-center items-center mt-24">
      <div className="spinner"></div>
    </div>
  );
}
