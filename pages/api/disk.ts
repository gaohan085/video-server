import checkDiskSpace, { DiskSpace } from "check-disk-space";
import { NextApiRequest, NextApiResponse } from "next";

export default async function diskFreeSpace(
  req: NextApiRequest,
  res: NextApiResponse<DiskSpace | string>
) {
  const path = process.env.BASIC_PATH;
  switch (req.method) {
    case "GET":
      res.json(await checkDiskSpace(path));
      break;

    default:
      res.status(404).json("Not Found");
  }
}
