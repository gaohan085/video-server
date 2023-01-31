import FileSys from "../components/fileSystemComponents/folder";
import Head from "next/head";
import Player from "../components/plyr";
import styled from "styled-components";
import { selectPlaySrc, useAppSelector } from "../src/store";

const Layout = styled.div`
  display: flex;
  height: 100%;
`;

export default function Index() {
  const playSrc = useAppSelector(selectPlaySrc);
  return (
    <>
      <Head>
        <title>Now Playing:{playSrc.slice(playSrc.lastIndexOf("/") + 1)}</title>
      </Head>
      <Layout>
        <Player />
        <FileSys />
      </Layout>
    </>
  );
}
