import { fetcher } from "../../src/hooks";
import FileElems from "./fileElems";
import type { Folder } from "../../pages/api/[[...slug]]";
import styled from "styled-components";
import useSWR from "swr";
import {
  selectCurrentPath,
  setCurrentPath,
  useAppDispatch,
  useAppSelector,
} from "../../src/store";

const StyledFolder = styled.div`
  margin-top: 45px;
  width: 20%;
  color: #00b2ff;
  font-weight: normal;
  min-width: 300px;
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
  return (
    <StyledFolder>
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
              >
                <th>../</th>
              </tr>
              {data.childElem.map((elem) => (
                <FileElems
                  key={data.childElem.indexOf(elem)}
                  currentPath={data.currentPath}
                  name={elem.name}
                  parentPath={data.parentFolder}
                  isFile={elem.isFile}
                  isFolder={elem.isFolder}
                  playSrc={elem.playSrc}
                  extName={elem.extName}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </StyledFolder>
  );
}
