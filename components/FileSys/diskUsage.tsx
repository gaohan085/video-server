import { DiskSpace } from "check-disk-space";
import { FcDatabase } from "react-icons/fc";
import Spinner from "../spinner";
import styled from "styled-components";
import useSWR from "swr";

const StyledDiskUsage = styled.div`
  display: flex;
  width: 250px;
  height: 65px;
  margin-bottom: 0px;
  font-size: 14px;
  padding-left: 10px;
  position: absolute;
  bottom: 0;
  p > span {
    display: inline-block;
    vertical-align: text-top;
    font-size: 16px;
  }
`;

export default function DiskUsage() {
  const { data, isLoading, error } = useSWR<DiskSpace, Error>("/api/disk");
  return (
    <StyledDiskUsage>
      {isLoading ? (
        <div style={{ margin: "auto" }}>
          <Spinner fontSize={20} />
        </div>
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
          ).toFixed(1)}GB / ${(data.size / (1024 * 1024 * 1024)).toFixed(
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
