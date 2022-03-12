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
        img="/images/main_knife.jpg"
      ></Hero>
      <Slider
        imagesPath={[
          { src: "/images/main_knife.jpg" },
          { src: "/images/main_knife.jpg" },
          { src: "/images/main_knife.jpg" },
        ]}
        title="Últimas Piezas"
      />
      <Services
        items={[
          {
            name: "Afilación",
            src: "/images/main_knife.jpg",
            route: "/servicios/afilacion",
          },
          {
            name: "Afilación",
            src: "/images/main_knife.jpg",
            route: "/servicios/afilacion",
          },
          {
            name: "Afilación",
            src: "/images/main_knife.jpg",
            route: "/servicios/afilacion",
          },
        ]}
      />
      <Form />
      <Footer />
    </div>
  );
}
