import Hero from "../components/Hero";
import Paragraph from "../components/Paragraph";
import Form from "../components/Form";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Image from "next/image";

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
            label: "Corona Católica (Entre Ríos)",
          },
          {
            src: "/images/main_knife.jpg",
            label: "Corona Católica (Entre Ríos)",
          },
          {
            src: "/images/main_knife.jpg",
            label: "Corona Católica (Entre Ríos)",
          },
        ]}
        className="!my-16"
      />
      <Paragraph
        text="<p>Además de dedicarme tiempo completo a la joyería, tambien disfruto de pasar tiempo con mi esposa e hija.</p>"
        className="mx-12 mt-16"
      />
      <div className="flex w-full items-center justify-center my-8 mb-20">
        <Image
          src="/images/family.png"
          height="170"
          width="220"
          alt="Imagen de mi familia"
          className="rounded"
        />
      </div>
      <Form className="!my-12" />
      <Footer />
    </main>
  );
}
