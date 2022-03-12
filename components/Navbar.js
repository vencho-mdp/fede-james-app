import NavbarItem from "./NavbarItem";
import { useRouter } from "next/router";
import Image from "next/image";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const router = useRouter();
  let links = [
    {
      text: "Inicio",
      route: "/",
    },
    {
      text: "Historia",
      route: "/historia",
    },
    {
      text: "Cuchillos",
      route: "/cuchillos",
    },
  ];
  links = links.map((el) => ({
    ...el,
    isActive: router.pathname === el.route,
  }));
  return (
    <div className="flex justify-center items-center">
      <div className="w-96">
        <div className="flex h-28 mx-16 justify-center items-center">
          <Image
            alt="Logo"
            layout="intrinsic"
            src="/images/logo.png"
            className="p-12"
            width={230}
            height={130}
            priority={true}
          />
        </div>
        <nav className="flex mt-4 mb-6  justify-around">
          {links.map((el) => (
            <NavbarItem key={el.text} {...el} />
          ))}
          <Dropdown
            name="Servicios"
            options={["Afilado", "Restauración", "Revitalización"]}
            isActive={router.pathname.includes("/servicios")}
          />
        </nav>
      </div>
    </div>
  );
}
