import NodeCache from "node-cache";
import useFetchPosts from "../../hooks/useFetchPosts";

const cache = new NodeCache({
  checkPeriod: 0,
  stdTTL: 86400,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }
  if (cache.get(`posts-${req.query.limit}`)) {
    res.status(200).send({ items: cache.get(`posts-${req.query.limit}`) });
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const items = await useFetchPosts(req);

  cache.set(`posts-${req.query.limit}`, items);

  res.status(200).send({
    items,
  });
}
