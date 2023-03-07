import { DiskSpace } from "check-disk-space";
import { FcDatabase } from "react-icons/fc";
import { fetcher } from "../../src/hooks";
import styled from "styled-components";
import useSWR from "swr";

const StyledDiskUsage = styled.div`
  width: 280px;
  margin-bottom: 0px;
  font-size: 15px;
  padding-left: 10px;
  position: absolute;
  bottom: 0;
  p > span {
    display: inline-block;
    vertical-align: middle;
  }
`;

export default function DiskUsage() {
  const { data, isLoading, error } = useSWR<DiskSpace, Error>(
    "/api/disk",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );
  return (
    <StyledDiskUsage>
      {isLoading ? (
        <>Loading</>
      ) : error ? (
        <>Error</>
      ) : (
        <p>
          <span>
            <FcDatabase />
          </span>
          <label htmlFor="progress">{`${(
            (data.size - data.free) /
            (1024 * 1024 * 1024)
          ).toFixed(1)}GB/${(data.size / (1024 * 1024 * 1024)).toFixed(
            1
          )}GB`}</label>
          <progress
            id="progress"
            max={data.size}
            value={data.size - data.free}
          >{`${data.free / (1024 * 1024)}/${
            data.size / (1024 * 1024)
          }`}</progress>
        </p>
      )}
    </StyledDiskUsage>
  );
}
