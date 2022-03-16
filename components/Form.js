import Subtitle from "./Subtitle";
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";
import { useState, useMemo } from "react";

export default function Form({ className }) {
  const otherWaysToGetInTouch = [
    {
      name: "Instagram",
      iconPath: "/images/instagram.svg",
      link: "https://www.instagram.com/federico.james.platero/",
    },
    {
      name: "WhatsApp",
      iconPath: "/images/whatsapp.svg",
      link: "https://api.whatsapp.com/send?phone=542235293037&text=Hola%20Federico!%20Me%20gustar%C3%ADa%20m%C3%A1s%20sobre%20este%20producto%3A%20%20",
    },
    {
      name: "Facebook",
      iconPath: "/images/facebook.svg",
      link: "https://www.facebook.com/federico.james",
    },
    {
      name: "Youtube",
      iconPath: "/images/youtube.svg",
      link: "https://www.youtube.com/channel/UC-ObH-6trQPabbEkKK0ZYTw",
    },
  ];
  const [socialMedia, setSocialMedia] = useState("Instagram");

  const [name, setName] = useState("");

  const [user, setUser] = useState("");

  const [message, setMessage] = useState("");

  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const userOrPhone = useMemo(() => {
    setUser("");
    return socialMedia === "Whatsapp"
      ? "Teléfono"
      : socialMedia === "Email"
      ? "Email"
      : "Usuario";
  }, [socialMedia]);

  const isValid = useMemo(() => {
    return name && user && message;
  }, [name, user, message]);

  const checkThatIsValid = (object) => {
    if (socialMedia !== "Whatsapp") return;
    if (object.target.value.length > 10) {
      object.target.value = object.target.value.slice(0, 10);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        socialMedia: socialMedia.toLowerCase(),
        name,
        user,
        message,
      }),
    });
    setLoading(false);
    setHasFormBeenSubmitted(true);
  };

  return (
    <>
      {loading ? (
        <div className="border border-gray-200 p-2 mx-8">
          <Subtitle
            className="!text-2xl text-gray-400 mb-4"
            text="Enviando..."
          />
          <div className="spinner mx-auto"></div>
        </div>
      ) : !hasFormBeenSubmitted ? (
        <form
          className={"mt-6 mb-8 mx-12 max-w-md md:mx-auto" + (className || "")}
          onSubmit={sendMessage}
        >
          <Subtitle text="Contacto" className="mb-2" />
          <div className="flex flex-col justify-around">
            <div className="flex flex-col mb-12">
              <label className="text-gray-200 font-medium">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-1 rounded-md text-gray-200 bg-black border border-gray-200 focus:outline-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex-col justify-between items-start pr-2">
                <label className="text-gray-200 font-medium">Red Social</label>
                <Dropdown
                  onChange={(event) => setSocialMedia(event.target.value)}
                  padding={false}
                  className="border p-1 border-white rounded-md min-w-min"
                  options={["Instagram", "Email", "Whatsapp"]}
                />
              </div>
              <div className="flex-col w-full justify-between items-start">
                <label className="text-gray-200 font-medium">
                  {userOrPhone}
                </label>
                <input
                  type={
                    socialMedia === "Whatsapp"
                      ? "number"
                      : socialMedia === "Email"
                      ? "email"
                      : "text"
                  }
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  onInput={checkThatIsValid}
                  className="rounded-md w-full pl-0.5 pr-1 py-1 text-gray-200 bg-black border border-gray-200 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-gray-200 font-light text-base mt-2 mb-12">
              Pedimos tu {userOrPhone.toLowerCase()} para que recibas la
              respuesta a tu consulta por ahí.
            </p>
            <div className="flex flex-col mb-12">
              <label className="text-gray-200 font-medium">Mensaje</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-1 rounded-md text-gray-200 bg-black border border-gray-200 focus:outline-none"
              />
            </div>
            <PrimaryButton disabled={!isValid} text="Enviar" />
          </div>
        </form>
      ) : (
        <div className="border rounded-md p-4 mx-8 my-12">
          <Subtitle
            className="mb-4 !text-left"
            text="Formulario Enviado con Éxito"
          />
          <p className="text-gray-200 text-base">
            Te contactaremos a la brevedad
          </p>
        </div>
      )}
      <div className="flex justify-around items-center w-full mt-12 mb-16">
        {otherWaysToGetInTouch.map((socialMedia) => (
          <a
            href={socialMedia.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4"
            key={socialMedia.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={socialMedia.iconPath}
              alt={socialMedia.name}
              className="h-8 w-8"
            />
          </a>
        ))}
      </div>
    </>
  );
}
