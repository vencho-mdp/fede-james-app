import { IgApiClient } from "instagram-private-api";
import https from "https";

export default async function fetchPosts(req) {
  async function* feedToIterator(feed) {
    do {
      const items = await feed.items();
      yield items;
    } while (feed.isMoreAvailable());
  }

  async function* flatten(iter) {
    for await (const items of iter) {
      yield* items;
    }
  }

  async function* filter(iter, fn) {
    for await (const item of iter) {
      if (fn(item)) yield item;
    }
  }

  async function* take(iter, n) {
    if (n <= 0) return;
    let i = 0;
    for await (const item of iter) {
      yield item;
      i++;
      if (i >= n) break;
    }
  }

  async function toArray(iter) {
    const arr = [];
    for await (const item of iter) {
      arr.push(item);
    }
    return arr;
  }

  const getBase64Image = async (url) => {
    return new Promise((resolve, reject) => {
      if (!url) {
        resolve(null);
      }
      https
        .get(url, (resp) => {
          resp.setEncoding("base64");
          var body = "data:" + resp.headers["content-type"] + ";base64,";
          resp.on("data", (data) => {
            body += data;
          });
          resp.on("end", () => {
            resolve(body);
          });
        })
        .on("error", (e) => {
          reject(e.message);
        });
    });
  };
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  const userId = await ig.user.getIdByUsername("federico.james.platero");
  const userFeed = ig.feed.user(userId);
  const items = await toArray(
    take(
      filter(
        flatten(feedToIterator(userFeed)),
        (i) =>
          i?.caption?.text.includes("#" + process.env.KEY_HASHTAG) &&
          i.image_versions2?.candidates[0].url
      ),
      req.query.limit || 8
    )
  );

  return await Promise.all(
    items.map(async (i) =>
      (await getBase64Image(i.image_versions2?.candidates[0].url)).substring(23)
    )
  );
}
