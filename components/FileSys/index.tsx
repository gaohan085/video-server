import Spinner from "../spinner";
import styled from "styled-components";
import useSWR from "swr";
import type { DirChildElem, Folder } from "../../pages/api/[[...slug]]";
import { FcFolder, FcOpenedFolder, FcVideoFile } from "react-icons/fc";
import React, { useState } from "react";
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
        {props.name.toUpperCase()}
      </p>
    </div>
  );
};

export const FolderElem: React.FC = (props: DirChildElem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  let { data, isLoading, error } = useSWR<Folder, Error>(
    shouldFetch ? "/api/" + props.currentPath + props.name : null
  );

  const handleClick = (): void => {
    setIsOpen(!isOpen);
    setShouldFetch(!shouldFetch);
  };

  return (
    <div className="folder">
      <p onClick={handleClick}>
        {isLoading ? (
          <Spinner />
        ) : (
          <span>{isOpen ? <FcOpenedFolder /> : <FcFolder />}</span>
        )}
        {props.name.toUpperCase()}
      </p>
      {error ? (
        <>{"Error Fetch Data"}</>
      ) : isLoading ? (
        <></>
      ) : !data ? (
        <></>
      ) : (
        <FileSys elems={data.childElem} />
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
  margin-bottom: 70px;
  font-size: 14px;
  min-height: 400px;
  .folder {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
  .folder > p {
    padding: 2px 5px;
    border-radius: 4px;
    width: fit-content;
    cursor: pointer;
    margin-block-start: 0.1em;
    margin-block-end: 0.1em;
    white-space: nowrap;
    line-height: 14px;
    user-select: none;
    :hover {
      background-color: #f3f3f3;
    }
  }
  .folder > p > span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    font-size: 16px;
  }
  .file {
    padding-left: 10px;
  }

  .file > p {
    padding: 2px 5px;
    border-radius: 4px;
    width: fit-content;
    cursor: pointer;
    margin-block-start: 0.1em;
    margin-block-end: 0.1em;
    white-space: nowrap;
    line-height: 14px;
    user-select: none;
    :hover {
      background-color: #f3f3f3;
    }
  }

  .file > p > span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    font-size: 16px;
  }
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #4096ff;
  width: 250px;
  margin-top: 18px;
  padding-left: 10px;
  position: relative;
  top: 0;
  bottom: 0;
  border-left: 1px solid #d3d3d3;
`;
/** CSS end */

const FileSysComp: React.FC = () => {
  const { data, isLoading, error } = useSWR<Folder>("/api/");

  return (
    <SideBar>
      <StyledFileSysComp>
        {isLoading ? (
          <div style={{ margin: "auto" }}>
            <Spinner fontSize={24} />
          </div>
        ) : error ? (
          <>Error Get Data</>
        ) : (
          <>
            <FileSys elems={data.childElem} />
          </>
        )}
      </StyledFileSysComp>
    </SideBar>
  );
};

export default FileSysComp;
