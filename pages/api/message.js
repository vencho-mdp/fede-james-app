import { IgApiClient } from "instagram-private-api";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  const userId = await ig.user.getIdByUsername("jp_guerrero07");
  const thread = ig.entity.directThread([userId.toString()]);
  const link =
    req.body.socialMedia === "email"
      ? req.body.user
      : req.body.socialMedia === "instagram"
      ? `https://instagram.com/${req.body.user}`
      : `https://api.whatsapp.com/send?phone=${req.body.user.replace(
          /\D/g,
          ""
        )}&text=%C2%A1Hola+${
          req.body.name
        }%21+%C2%BFEn+qu%C3%A9+productos+estabas+interesado%3F`;

  const message = `
  Nombre: ${req.body.name},
  
  Mensaje: ${req.body.message},

  ${
    req.body.socialMedia === "email " ? "Email" : "Link"
  } para Contactarlo: ${link}
  `;
  await thread.broadcastText(message);

  res.status(200).send({
    message: "Mensaje enviado correctamente",
  });
}
