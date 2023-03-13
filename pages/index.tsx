import FileSysComp from "../components/FileSys/index";
import Head from "next/head";
import Player from "../components/plyr";
import StatusBar from "../components/statusBar";
import styled from "styled-components";
import { selectPlaySrc, useAppSelector } from "../src/store";

const Layout = styled.div`
  color: #4096ff;
  .main {
    position: absolute;
    top: 0;
    bottom: 22px;
    left: 0;
    right: 0;
    padding: 0px;
    height: inherit;
    display: flex;
    justify-content: center;
  }
`;

export default function Index() {
  const playSrc = useAppSelector(selectPlaySrc);
  const title = `Now Playing : ${playSrc.slice(playSrc.lastIndexOf("/") + 1)}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <div className="main">
          <Player />
          <FileSysComp />
        </div>
        <StatusBar />
      </Layout>
    </>
  );
}
