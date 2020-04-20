import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export const useIconHook = (icon) => {
  const [iconPath, setIconPath] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/api/icons/${icon}`)
      .then((res) => {
        try {
          return res.json();
        } catch (err) {
          console.warn(e);
        }
      })
      .then((data) => {
        setIconPath(data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("Component did update");
  }, [icon]);

  return JSON.stringify(iconPath).replace(/([["])./g, "");
};
