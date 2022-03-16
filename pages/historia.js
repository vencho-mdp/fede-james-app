import Hero from "../components/Hero";
import Paragraph from "../components/Paragraph";
import Form from "../components/Form";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

export default function Historia() {
  return (
    <main>
      <Hero title="Historia" img="/images/main_knife.jpg"></Hero>
      <Paragraph
        text="<p>Soy un platero con <b> 15 años </b> de experiencia  haciendo <b> piezas de calidad, operativas y estéticas </b>. Desde los trabajos más complejos, hasta los más simples son <b> todos exclusivos </b> y a todos <b> les doy mi mayor dedicación </b>.</p>"
        className="mx-12 mt-16"
      />
      <Slider
        title="Mis Mejores Trabajos"
        imagesPath={[
          {
            src: "/images/main_knife.jpg",
            label: "Corona Católica (Entre Ríos)1",
          },
          {
            src: "/images/main_knife2.jpg",
            label: "Corona Católica (Entre Ríos)2",
          },
          {
            src: "/images/main_knife3.jpg",
            label: "Corona Católica (Entre Ríos)3",
          },
        ]}
        className="!my-16"
      />
      <Form className="!my-10" />
      <Footer />
    </main>
  );
}
