import checkDiskSpace, { DiskSpace } from "check-disk-space";
import { NextApiRequest, NextApiResponse } from "next";

export default async function diskFreeSpace(
  req: NextApiRequest,
  res: NextApiResponse<DiskSpace>
) {
  const path = process.env.BASIC_PATH;
  await new Promise((r) => setTimeout(r, 200));
  res.json(await checkDiskSpace(path));
}
