import FileSys from "../components/fileSystemComponents/folder";
import Player from "../components/plyr";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  height: 100%;
`;

export default function Index() {
  return (
    <Layout>
      <Player />
      <FileSys />
    </Layout>
  );
}
