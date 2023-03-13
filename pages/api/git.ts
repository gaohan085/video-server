import { cwd } from "process";
import { execSync } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default function Git(req: NextApiRequest, res: NextApiResponse<string>) {
  const commit = execSync("git rev-parse HEAD", { cwd: cwd() })
    .toString()
    .trim()
    .slice(0, 8);
  switch (req.method) {
    case "GET":
      res.send(commit);
      break;
    default:
      res.status(404).send("NOT FOUND");
      break;
  }
}
