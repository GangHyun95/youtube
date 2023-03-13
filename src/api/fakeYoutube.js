import axios from "axios";

export default class FakeYoutube {
  constructor() {}

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword() {
    return axios
      .get(`/videos/search.json`)
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #mostPopular() {
    return axios.get(`/videos/popular.json`).then((res) => res.data.items);
  }
}
