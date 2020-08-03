import categories from "./quickbuild.json";
import initMiddleware from "../../../lib/init-middleware";
import Cors from "cors";

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(categories);
}
