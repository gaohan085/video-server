import { lstat } from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import { Directory, getSubDir } from '../../src/getChildDIr';

export interface Folder {
  parentFolder: string; //relative path
  currentPath: string; //relative path
  childElem: Directory[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Folder | string>) {
  const path = req.query.slug as undefined | string[];
  const basicPath = process.env.BASIC_PATH;

  let pathFromUrl = '';

  path === undefined
    ? (pathFromUrl = '')
    : path.forEach((elem) => {
        pathFromUrl += '/' + elem;
      });

  if (basicPath === undefined) {
    res.status(503).send('Basic path undefined in .env file');
  } else {
    const directories = await getSubDir(basicPath, pathFromUrl);
    directories.length === 0
      ? res.status(404).send('file not found')
      : directories.length === 1
      ? res.send({
          parentFolder:
            pathFromUrl === ''
              ? ''
              : (await lstat(basicPath + pathFromUrl)).isDirectory()
              ? pathFromUrl.slice(1, pathFromUrl.lastIndexOf('/') + 1).slice(0, pathFromUrl.lastIndexOf('/') + 1) //文件夹
              : pathFromUrl,

          currentPath: pathFromUrl === '' ? '/' : pathFromUrl.slice(1, pathFromUrl.lastIndexOf('/') + 1),
          childElem: directories,
        })
      : res.send({
          parentFolder: pathFromUrl === '' ? '' : pathFromUrl.slice(1, pathFromUrl.lastIndexOf('/') + 1),
          currentPath: pathFromUrl === '' ? '/' : pathFromUrl.slice(1) + '/',
          childElem: directories,
        });
  }
}
