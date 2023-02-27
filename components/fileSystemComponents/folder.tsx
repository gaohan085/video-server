import DiskUsage from "./diskUsage";
import { fetcher } from "../../src/hooks";
import FileElems from "./fileElems";
import type { Folder } from "../../pages/api/[[...slug]]";
import styled from "styled-components";
import useSWR from "swr";
import useWindowDimensions from "../../src/useWindowDimensions";
import {
  selectCurrentPath,
  setCurrentPath,
  useAppDispatch,
  useAppSelector,
} from "../../src/store";

const StyledFolder = styled.div<{ height: number | null }>`
  margin-top: 45px;
  width: 20%;
  color: #00b2ff;
  font-weight: normal;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => props.height - 205 + "px"};
  table {
    width: 70%;
    /* margin: auto; */
  }
  table > thead > tr > th {
    text-align: left;
    font-weight: 400;
    font-size: 17px;
    border-bottom: 1px solid #d9d6d6;
    cursor: default;
  }
  table > tbody > tr > th {
    padding: 2px 1px;
    text-align: left;
    font-weight: 400;
    font-size: 14px;
  }
`;

export default function FileSys() {
  const currentPath = useAppSelector(selectCurrentPath);
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useSWR<Folder, Error>(
    () => "/api/" + currentPath,
    fetcher,
    { refreshInterval: 50000 }
  );
  const { height } = useWindowDimensions();
  return (
    <StyledFolder height={height}>
      {isLoading ? (
        <>Loading</>
      ) : error ? (
        <>Error Fetching data.</>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={() => {
                  dispatch(setCurrentPath(data.parentFolder));
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                <th>../</th>
              </tr>
              {data.childElem
                .filter((elem) => elem.extName === ".mp4" || elem.isFolder) // filter files not with '.mp4' format
                .map((elem, index) => {
                  return (
                    <FileElems
                      key={index}
                      currentPath={data.currentPath}
                      name={elem.name}
                      parentPath={data.parentFolder}
                      isFile={elem.isFile}
                      isFolder={elem.isFolder}
                      playSrc={elem.playSrc}
                      extName={elem.extName}
                    />
                  );
                })}
            </tbody>
          </table>
        </>
      )}
      <DiskUsage />
    </StyledFolder>
  );
}
