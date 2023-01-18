import { Directory } from '../src/getChildDIr';
import { Folder } from '../pages/api/[[...slug]]';
import Link from 'next/link';

interface IsFileProps {
  directory: Directory;
  clickHandler: () => string;
}
export function IsFile(props: IsFileProps) {
  return <p onClick={props.clickHandler}>{props.directory.name}</p>;
}

interface IsFolderProps {
  directory: Directory;
  currentPath: string;
}
export function IsFolder(props: IsFolderProps) {
  return (
    <Link passHref={true} href={props.currentPath + props.directory.name}>
      <p>{props.directory.name}</p>
    </Link>
  );
}

interface FolderProps {
  folder: Folder;
  clickHandler: () => string;
}
export default function File(props: FolderProps) {
  const childElem = props.folder.childElem.map((elem) => {
    if (elem.isFile) {
      return <IsFile directory={elem} clickHandler={props.clickHandler} key={elem.name} />;
    } else {
      return <IsFolder directory={elem} currentPath={props.folder.currentPath} key={elem.name} />;
    }
  });

  return (
    <>
      {props.folder.parentFolder === undefined ? (
        <Link passHref href={'/'} className=".parentPath">
          {'../'}
        </Link>
      ) : (
        <Link passHref href={props.folder.parentFolder} className=".parentPath">
          父目录 {' ../'}
        </Link>
      )}
      <p className=".currentPath">当前路径 {props.folder.currentPath}</p>
      {childElem}
    </>
  );
}
