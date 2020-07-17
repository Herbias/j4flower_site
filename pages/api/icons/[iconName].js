import icons from "./icons.json";
import initMiddleware from '../../../lib/init-middleware'
import Cors from 'cors'

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)


export default async function handler(req, res) {
  await cors(req, res);
  const name = req.query.iconName;
  let path = "";

  path = icons.filter((icon) => {
    path = Object.keys(icon).includes(name) ?
      res.json([icon[name].path]) :
      "invalid";
  });

  // res.json([path]);
}