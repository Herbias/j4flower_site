import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import icons from "../pages/api/icons/icons.json";

export const useIconHook = (icon) => {
  const [iconPath, setIconPath] = useState(null);
  useEffect(() => {}, []);

  useEffect(() => {
    if (icon)
      setIconPath(
        icons.filter((elm) => {
          return elm[icon];
        })
      );
  }, [icon]);

  if (iconPath) return iconPath[0][icon]["path"];
};
