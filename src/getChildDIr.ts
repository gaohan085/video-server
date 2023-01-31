import path from "path";
import { lstat, opendir } from "fs/promises";

const nginxServeAddress = process.env.NGINX_SERVE_ADDRESS;

export interface DirectoryChildElem {
  name: string;
  isFolder: boolean;
  isFile: boolean;
  playSrc?: string;
  extName: string | ".mp4";
}

/**
 *
 * @param basicPath
 * @param relPath
 * @returns
 */
export const getSubDir = async (
  basicPath: string,
  relPath: string
): Promise<DirectoryChildElem[]> => {
  const stat = await lstat(basicPath + relPath);
  if (stat.isDirectory()) {
    const childDir: DirectoryChildElem[] = [];
    const dir = await opendir(basicPath + relPath);
    for await (const dirent of dir) {
      childDir.push({
        name: dirent.name,
        isFolder: dirent.isDirectory(),
        isFile: dirent.isFile(),
        playSrc:
          dirent.isFile() && path.extname(dirent.name) === ".mp4"
            ? nginxServeAddress + relPath + "/" + dirent.name
            : "",
        extName: dirent.isFile() ? path.extname(dirent.name) : "",
      });
    }
    return childDir;
  } else if (stat.isFile()) {
    return [
      {
        name: (basicPath + relPath).slice(
          (basicPath + relPath).lastIndexOf("/") + 1
        ),
        isFolder: stat.isDirectory(),
        isFile: stat.isFile(),
        playSrc:
          stat.isFile() && path.extname(basicPath + relPath) === ".mp4"
            ? nginxServeAddress + relPath
            : "",
        extName: stat.isFile() ? path.extname(basicPath + relPath) : "",
      },
    ];
  } else {
    return [];
  }
};
