import axios from "axios";

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          q: keyword,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #mostPopular() {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet",
          chart: "mostPopular",
          maxResults: 25,
        },
      })
      .then((res) => res.data.items);
  }
}
