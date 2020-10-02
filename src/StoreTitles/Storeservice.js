export default class StoreApi {
  async getArticles(page = 1) {
    const res = await fetch(`https://conduit.productionready.io/api/articles?limit=5&offset=${page}`);

    if (!res.ok) {
      throw new Error(`Could not fetch!!! recived status: ${res.status}`);
    }

    return res.json();
  }
}
