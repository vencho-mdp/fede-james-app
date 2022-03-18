import Subtitle from "./Subtitle";
import PrimaryButton from "./PrimaryButton";
import { useState, useMemo } from "react";
import { event } from "../lib/ga.js";

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

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [contactMethod, setContactMethod] = useState("phone");

  const [user, setUser] = useState("");

  const isValid = useMemo(() => {
    return (
      name &&
      contactMethod &&
      (contactMethod === "email"
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user)
        : user.length > 7) &&
      message
    );
  }, [name, contactMethod, user, message]);

  const checkThatIsValid = (object) => {
    if (contactMethod !== "phone") return;
    // format phone number
    const arr = object.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      .slice(1);

    setUser(
      `${arr[0] ? `(${arr[0]}) ` : ""}${arr[1] ? `${arr[1]}` : ""}${
        arr[2] ? `-${arr[2]}` : ""
      }`
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    event({
      action: "contact_form",
      params: {
        contactMethod: contactMethod.toLowerCase(),
        name,
        user: contactMethod !== "email" ? user.replace(/\D/g, "") : user,
        message,
      },
    });
    await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactMethod: contactMethod.toLowerCase(),
        name,
        user: contactMethod !== "email" ? user.replace(/\D/g, "") : user,
        message,
      }),
    });

    setLoading(false);
    setHasFormBeenSubmitted(true);
  };

  return (
    <>
      {loading ? (
        <div className="border border-gray-200 p-2 mx-8 rounded-md">
          <Subtitle
            className="!text-2xl text-gray-400 mb-4 mt-6"
            text="Enviando..."
          />
          <div className="spinner my-8 mx-auto"></div>
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
            <div className="flex flex-col mb-12">
              <label className="text-gray-200 font-medium">Mensaje</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-1 rounded-md text-gray-200 bg-black border border-gray-200 focus:outline-none"
              />
            </div>
            <div className="flex flex-col mb-12">
              <Subtitle
                className="!text-lg !text-left"
                text="¿Por donde querés que te contactemos?"
              />
              <div className="flex items-center">
                <input
                  type="radio"
                  name="contact-method"
                  id="phone"
                  className="my-4"
                  value="phone"
                  defaultChecked
                  onChange={(e) => {
                    setContactMethod(e.target.value);
                    setUser("");
                  }}
                />
                <label htmlFor="phone" className=" ml-2 text-gray-200">
                  Teléfono
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  name="contact-method"
                  onChange={(e) => {
                    setContactMethod(e.target.value);
                    setUser("");
                  }}
                  id="email"
                />
                <label htmlFor="email" className=" ml-2 text-gray-200">
                  Email
                </label>
              </div>
              <div className="flex flex-col mt-6">
                <label className="text-gray-200 font-medium">
                  {contactMethod === "phone" ? "Teléfono" : "Email"}
                </label>
                <input
                  type={contactMethod === "email" ? "email" : "tel"}
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                    checkThatIsValid(e);
                  }}
                  className="p-1 rounded-md text-gray-200 bg-black border border-gray-200 focus:outline-none"
                />
              </div>
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
            onClick={() =>
              event({
                action: "share",
                params: {
                  value: socialMedia.name,
                },
              })
            }
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
