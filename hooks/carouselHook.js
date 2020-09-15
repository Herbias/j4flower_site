import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import data from "../pages/api/contents/carousel.json";

export const useCarouselHook = () => {
  const [slides, setSlides] = useState(null);
  useEffect(() => {
    setSlides(data);
  }, []);

  return slides;
};
