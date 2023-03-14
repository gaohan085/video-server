import { BiGitCommit } from "react-icons/bi";
import type { DiskSpace } from "check-disk-space";
import { FcDatabase } from "react-icons/fc";
import styled from "styled-components";
import useSWR from "swr";

const StyledStatusBar = styled.div`
  position: absolute;
  height: 22px;
  bottom: 0;
  background: #e5e5e5;
  width: 100%;
  font-size: 14px;
  div {
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    p {
      padding-left: 15px;
      padding-right: 15px;
      margin-block-start: 0em;
      margin-block-end: 0em;

      svg {
        display: inline-block;
        vertical-align: sub;
        font-size: 18px;
        line-height: normal;
      }
    }
  }
`;

const DiskUsage = () => {
  const { data, isLoading, error } = useSWR<DiskSpace, Error>("/api/disk");

  if (error) return <p>{"Error Fetch Data"}</p>;
  if (isLoading) return <p>{"Loading"}</p>;

  return (
    <p>
      <FcDatabase />
      <>{`Free disk space: ${(data.free / (1024 * 1024 * 1024)).toFixed(
        1
      )} GB`}</>
    </p>
  );
};

const GitCommit = () => {
  const { data, isLoading, error } = useSWR<string, Error>("/api/git");
  return (
    <>
      <p>
        {isLoading ? (
          <></>
        ) : error ? (
          <>{"Error"}</>
        ) : (
          <>
            <BiGitCommit />
            {`Git commit: ${data}`}
          </>
        )}
      </p>
    </>
  );
};

const StatusBar = () => {
  return (
    <StyledStatusBar>
      <div>
        <DiskUsage />
        <GitCommit />
      </div>
    </StyledStatusBar>
  );
};

export default StatusBar;
