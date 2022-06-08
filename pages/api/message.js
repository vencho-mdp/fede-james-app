import { IgApiClient } from "instagram-private-api";

const messages = [];

const chunk = (string, size) => {
  const chunkedArray = [];
  let index = 0;
  while (index < string.length) {
    chunkedArray.push(string.substring(index, size + index));
    index += size;
  }
  return chunkedArray;
};

const sendMessages = async () => {
  const message = messages.join("\n------------------\n");
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  const userId = await ig.user.getIdByUsername("federico.james.platero");
  const thread = ig.entity.directThread([userId.toString()]);
  if (message.length > 1000) {
    const chunks = chunk(message, 1000);
    for (const chunk of chunks) {
      await thread.broadcastText(chunk);
    }
  } else await thread.broadcastText(message);
};

setInterval(() => {
  if (messages.length > 0) {
    sendMessages();
    messages.length = 0;
  }
}, 3600000);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  messages.push(`
  Nombre: ${req.body.name},
  
  Mensaje: ${req.body.message},

  ${req.body.contactMethod === "email " ? "Email" : "Link"} para Contactarlo: ${
    req.body.contactMethod === "email"
      ? req.body.user
      : `https://api.whatsapp.com/send?phone=${req.body.user.replace(
          /\D/g,
          ""
        )}&text=%C2%A1Hola+${
          req.body.name
        }%21+%C2%BFEn+qu%C3%A9+productos+estabas+interesado%3F`
  }
  `);

  res.status(200).send({
    message: "Mensaje enviado correctamente",
  });
}
