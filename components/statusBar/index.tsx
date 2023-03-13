import type { DiskSpace } from "check-disk-space";
import styled from "styled-components";
import useSWR from "swr";

const StyledStatusBar = styled.div`
  position: absolute;
  height: 22px;
  bottom: 0;
  background: #f3f3f3;
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
    }
  }
`;

const DiskUsage = () => {
  const { data, isLoading, error } = useSWR<DiskSpace, Error>("/api/disk");
  return (
    <>
      <p>
        {isLoading ? (
          <></>
        ) : error ? (
          <>{"error"}</>
        ) : (
          <>{`Free disk space: ${(data.free / (1024 * 1024 * 1024)).toFixed(
            1
          )} GB`}</>
        )}
      </p>
    </>
  );
};

const GitCommit = () => {
  const { data, error } = useSWR<string, Error>("/api/git");
  return (
    <>
      <p>{error ? <>{"Error"}</> : <>{`Git commit: ${data}`}</>}</p>
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
