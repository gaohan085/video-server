import FileSysComp from "../components/FileSys/index";
import Head from "next/head";
import Player from "../components/plyr";
import styled from "styled-components";
import { selectPlaySrc, useAppSelector } from "../src/store";

const Layout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
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
        <Player />
        <FileSysComp />
      </Layout>
    </>
  );
}
