import checkDiskSpace, { DiskSpace } from "check-disk-space";
import { NextApiRequest, NextApiResponse } from "next";

export default async function diskFreeSpace(
  req: NextApiRequest,
  res: NextApiResponse<DiskSpace>
) {
  const path = process.env.BASIC_PATH;

  res.json(await checkDiskSpace(path));
}
