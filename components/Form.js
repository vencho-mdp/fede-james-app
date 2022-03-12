import Subtitle from "./Subtitle";
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";
import { useState, useMemo, useCallback } from "react";

export default function Form({ className }) {
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
        <div className="spinner mx-auto"></div>
      ) : !hasFormBeenSubmitted ? (
        <form
          className={
            "mt-4 mb-2 mx-12 max-w-md md:mx-auto my-12 " + (className || "")
          }
          onSubmit={sendMessage}
        >
          <Subtitle text="Contacto" className="mb-2" />
          <div className="flex flex-col justify-around">
            <div className="flex flex-col mb-12">
              <label className="text-white font-medium">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-1 rounded text-white bg-black border border-gray-200 focus:outline-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex-col justify-between items-start pr-2">
                <label className="text-white font-medium">Red Social</label>
                <Dropdown
                  onChange={(event) => setSocialMedia(event.target.value)}
                  padding={false}
                  className="border p-1 border-white rounded min-w-min"
                  options={["Instagram", "Email", "Whatsapp"]}
                />
              </div>
              <div className="flex-col w-full justify-between items-start">
                <label className="text-white font-medium">{userOrPhone}</label>
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
                  className="rounded w-full pl-0.5 pr-1 py-1 text-white bg-black border border-gray-200 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-white font-light text-base mt-2 mb-12">
              Pedimos tu {userOrPhone.toLowerCase()} para que recibas la
              respuesta a tu consulta por ahí.
            </p>
            <div className="flex flex-col mb-12">
              <label className="text-white font-medium">Mensaje</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-1 rounded text-white bg-black border border-gray-200 focus:outline-none"
              />
            </div>
            <PrimaryButton disabled={!isValid} text="Enviar" />
          </div>
        </form>
      ) : (
        <div className="border rounded p-4 mx-8">
          <Subtitle
            className="mb-4 !text-left"
            text="Formulario Enviado con Éxito"
          />
          <p className="text-white text-base">Te contactaremos a la brevedad</p>
        </div>
      )}
    </>
  );
}
