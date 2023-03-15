import { createContext, useContext } from "react";
import FakeYoutube from "../api/fakeYoutube";
import Youtube from "../api/youtube";

const YoutubeApiContext = createContext();

export function YoutubeApiProvider({ children }) {
  const youtube = new Youtube();
  // const youtube = new FakeYoutube();
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export const useYoutubeApi = () => useContext(YoutubeApiContext);
