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
          { src: "/images/main_knife2.jpg" },
          { src: "/images/main_knife3.jpg" },
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
            name: "Restauración",
            src: "/images/main_knife2.jpg",
            route: "/servicios/restauracion",
          },
          {
            name: "Revitalización",
            src: "/images/main_knife3.jpg",
            route: "/servicios/revitalizacion",
          },
        ]}
      />
      <Form />
      <Footer />
    </div>
  );
}
