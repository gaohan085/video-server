import { DirectoryChildElem } from "../../pages/api/[[...slug]]";
import { setCurrentPath, setPlaySrc, useAppDispatch } from "../../src/store";

interface FileProps extends DirectoryChildElem {
  currentPath: string;
  parentPath: string;
}

export default function FileElems(props: FileProps) {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (props.isFile && props.extName === ".mp4") {
      dispatch(setPlaySrc(props.playSrc));
    }
    if (props.isFolder) {
      const currentPath = props.currentPath === "/" ? "" : props.currentPath;
      dispatch(setCurrentPath(currentPath + props.name + "/"));
    }
  };

  return (
    <tr
      onClick={handleClick}
      style={{
        textDecoration: props.isFolder ? "underline 1px solid #00b2ff" : "",
        cursor:
          props.isFile && props.extName === ".mp4"
            ? "pointer"
            : props.isFolder
            ? "pointer"
            : "default",
      }}
    >
      <th>
        {props.name}
        {props.isFolder ? "/" : ""}
      </th>
    </tr>
  );
}
