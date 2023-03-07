import DiskUsage from "./diskUsage";
import { fetcher } from "../../src/hooks";
import styled from "styled-components";
import useSWR from "swr";
import type { DirChildElem, Folder } from "../../pages/api/[[...slug]]";
import { FcFolder, FcOpenedFolder, FcVideoFile } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { setPlaySrc, useAppDispatch } from "../../src/store";

export const FileElem: React.FC = (props: DirChildElem) => {
  const dispatch = useAppDispatch();
  const handlePlayClick = (): void => {
    //TODO handle video play button click event
    dispatch(setPlaySrc(props.playSrc));
  };
  return (
    <div className="file">
      <p onClick={handlePlayClick}>
        <span>
          <FcVideoFile />
        </span>
        {props.name}
      </p>
    </div>
  );
};

export const FolderElem: React.FC = (props: DirChildElem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [childNode, setChildNode] = useState<Folder | string | undefined>();

  useEffect(() => {
    if (isOpen) {
      fetcher<Folder>("/api/" + props.currentPath + props.name)
        .then((data) => setChildNode(data))
        .catch(() => setChildNode("ERROR GET DATA."));
    } else {
      setChildNode(undefined);
    }
  }, [isOpen, props.currentPath, props.name]);

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="folder">
      <p onClick={handleClick}>
        <span>{isOpen ? <FcOpenedFolder /> : <FcFolder />}</span>
        {props.name}
      </p>
      {!childNode ? (
        <></>
      ) : typeof childNode === "string" ? (
        <p>{childNode}</p>
      ) : (
        <FileSys elems={childNode.childElem} />
      )}
    </div>
  );
};

export const FileSys = (props: { elems: DirChildElem[] }) => {
  return (
    <>
      {props.elems
        .filter((elem) => elem.isFolder || elem.extName === ".mp4")
        .map((elem, index) => {
          return elem.isFile ? (
            <FileElem key={index} {...elem} />
          ) : (
            <FolderElem key={index} {...elem} />
          );
        })}
    </>
  );
};

/** CSS start */

const StyledFileSysComp = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  color: #4096ff;
  font-size: 15px;
  margin-bottom: 70px;
  .folder {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
  .folder > p {
    cursor: pointer;
    margin-block-start: 0.15em;
    margin-block-end: 0.15em;
    white-space: nowrap;
  }
  .folder > p > span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 3px;
  }
  .file {
    padding-left: 10px;
  }

  .file > p {
    cursor: pointer;
    height: 20px;
    margin-block-start: 0.15em;
    margin-block-end: 0.15em;
    white-space: nowrap;
  }

  .file > p > span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 3px;
  }
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #4096ff;
  width: 280px;
  margin-top: 18px;
  padding-left: 10px;
  position: relative;
  top: 0;
  bottom: 0;
  border-left: 1px solid #d3d3d3;
`;

/** CSS end */

const FileSysComp: React.FC = () => {
  const { data, isLoading, error } = useSWR<Folder>("/api/", fetcher, {
    refreshInterval: 50000,
  });

  return (
    <SideBar>
      <StyledFileSysComp>
        {isLoading ? (
          <>Loading</>
        ) : error ? (
          <>Error Get Data</>
        ) : (
          <>
            <FileSys elems={data.childElem} />
          </>
        )}
      </StyledFileSysComp>
      <DiskUsage />
    </SideBar>
  );
};

export default FileSysComp;
