import { extname } from "path";
import { lstat, opendir } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export interface DirChildElem {
  name: string;
  isFile: boolean;
  isFolder: boolean;
  extName: string;
  playSrc?: string;
  currentPath: string; //relative path
}
export interface Folder {
  parentFolder: string; //relative path
  currentPath: string; //relative path
  childElem: DirChildElem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Folder | string>
) {
  console.log(__dirname);
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
      let dirents: DirChildElem[] = [];
      for await (const dirent of dir) {
        dirents.push({
          name: dirent.name,
          isFile: dirent.isFile(),
          isFolder: dirent.isDirectory(),
          extName: dirent.isDirectory() ? "" : extname(dirent.name), //[o] if dirent is folder, should not contain extname
          playSrc:
            extname(dirent.name) === ".mp4" && !pathArray
              ? nginxServeAddress + dirent.name
              : extname(dirent.name) === ".mp4" && pathArray
              ? nginxServeAddress + pathArray.join("/") + "/" + dirent.name
              : "",
          currentPath: !pathArray ? "/" : pathArray.join("/") + "/",
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
            currentPath: !pathArray ? "/" : pathArray.join("/") + "/",
          },
        ],
      });
    }
  } catch (e) {
    res.status(404).send("NOT FOUND");
  }
}
