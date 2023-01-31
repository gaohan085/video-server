import { extname } from "path";
import { lstat, opendir } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export interface DirectoryChildElem {
  name: string;
  isFile: boolean;
  isFolder: boolean;
  extName: string;
  playSrc?: string;
}
export interface Folder {
  parentFolder: string; //relative path
  currentPath: string; //relative path
  childElem: DirectoryChildElem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Folder | string>
) {
  const pathArray = req.query.slug as undefined | string[];
  const basicPath = process.env.BASIC_PATH;
  const nginxServeAddress = process.env.NGINX_SERVE_ADDRESS;

  try {
    const isDirectory = !pathArray
      ? (await lstat(basicPath)).isDirectory()
      : (await lstat(basicPath + pathArray.join("/"))).isDirectory();

    if (isDirectory) {
      const dir = !pathArray
        ? await opendir(basicPath)
        : await opendir(basicPath + pathArray.join("/"));
      let dirents: DirectoryChildElem[] = [];
      for await (const dirent of dir) {
        dirents.push({
          name: dirent.name,
          isFile: dirent.isFile(),
          isFolder: dirent.isDirectory(),
          extName: extname(dirent.name),
          playSrc:
            extname(dirent.name) === ".mp4"
              ? nginxServeAddress + dirent.name
              : "",
        });
      }
      res.json({
        parentFolder: !pathArray ? "/" : pathArray.slice(0, -1).join("/") + "/",
        currentPath: !pathArray ? "/" : pathArray.join("/") + "/",
        childElem: dirents,
      });
    } else {
      res.json({
        parentFolder: pathArray.slice(0, -2).join("/"),
        currentPath: pathArray.slice(0, -1).join("/"),
        childElem: [
          {
            name: pathArray.at(-1),
            isFile: true,
            isFolder: false,
            playSrc:
              extname(pathArray.join("/")) === ".mp4"
                ? nginxServeAddress + pathArray.join("/")
                : "",
            extName: extname(pathArray.join("/")),
          },
        ],
      });
    }
  } catch (e) {
    res.status(404).send("NOT FOUND");
  }
}
