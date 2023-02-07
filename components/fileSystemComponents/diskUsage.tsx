import { DiskSpace } from "check-disk-space";
import { fetcher } from "../../src/hooks";
import styled from "styled-components";
import useSWR from "swr";

const StyledDiskUsage = styled.div`
  margin-bottom: 0px;
  font-size: 14px;
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
        <>
          {`
          Disk Usage : ${(data.free / (1024 * 1024 * 1024)).toFixed(1)} GB/ ${(
            data.size /
            (1024 * 1024 * 1024)
          ).toFixed(1)} GB
        `}
        </>
      )}
    </StyledDiskUsage>
  );
}
