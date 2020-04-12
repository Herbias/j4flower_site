import icons from "./icons.json";

export default (req, res) => {
  const name = req.query.iconName;
  let path = "";

  path = icons.filter((icon) => {
    path = Object.keys(icon).includes(name)
      ? res.json([icon[name].path])
      : "invalid";
  });

  // res.json([path]);
};
