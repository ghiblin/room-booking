import { NextApiRequest, NextApiResponse } from "next";
import { Backend } from "../../server/main";

export default (req: NextApiRequest, res: NextApiResponse) =>
  new Promise(async (resolve) => {
    const listener = await Backend.getListener();
    listener(req, res);
    res.on("finish", resolve);
  });
