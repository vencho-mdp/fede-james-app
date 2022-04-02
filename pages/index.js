import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Services from "../components/Services";
import Form from "../components/Form";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Hero
        subtitle="Federico James"
        title="Arte en la Orfebrería"
        img="/images/knives/main_knife.jpg"
      ></Hero>
      <Slider
        imagesPath={[
          { src: "/images/knives/IMG_1635_photo.jpg" },
          { src: "/images/knives/IMG_1023_photo.jpg" },
          { src: "/images/knives/IMG_3143_photo.jpg" },
        ]}
        title="Últimas Piezas"
      />
      <Services
        items={[
          {
            name: "Afilación",
            src: "/images/knives/IMG_3146_photo.jpg",
            route: "/servicios/afilacion",
          },
          {
            name: "Restauración",
            src: "/images/knives/IMG_3603_photo.jpg",
            route: "/servicios/restauracion",
          },
          {
            name: "Revitalización",
            src: "/images/knives/IMG_6559_photo.jpg",
            route: "/servicios/revitalizacion",
          },
        ]}
      />
      <Form />
      <Footer />
    </div>
  );
}
