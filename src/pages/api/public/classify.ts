import type { NextApiRequest, NextApiResponse } from "next";
import { ydfsfsdf } from "src/server/api/custom-routes/classification";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.body", req.body);
  const { name, age, abstracts } = req.body as {
    abstracts: { text: string; id: number }[];
    name: string;
    age: number;
  };
  const absLength = abstracts.map((abstract) => {
    return abstract.text.length;
  });

  res.status(200).json({ message: ydfsfsdf({ name, age }), absLength });
}
