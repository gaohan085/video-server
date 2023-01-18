/* eslint-disable sort-imports */
import axios from 'axios';
import { useRouter } from 'next/router';
import { APITypes } from 'plyr-react';
import { useRef } from 'react';
import styled from 'styled-components';
import File from '../components/folder';
import Plyr from '../components/plyr';
import { Folder } from './api/[[...slug]]';

const LayOut = styled.div`
  display: flex;
  height: 100%;
  .video {
    width: 80%;
    .videoBox {
      padding: 50px;
    }
  }
  .folder {
    margin: 50px;
    width: 20%;
    color: #00b2ff;
  }
`;

export default function Index(props: Folder) {
  if (useRouter().isFallback) {
    return <></>;
  } else {
    const handleClick = (e) => {
      return e.value.string as string;
    };
    const ref = useRef<APITypes>(null);
    return (
      <LayOut>
        <div className="video">
          <div className="videoBox">
            <Plyr
              ref={ref}
              source={{
                type: 'video',
                sources: [
                  {
                    src: 'http://192.168.1.11/video/%E7%BE%8E%E5%92%B2%E3%81%8B%E3%82%93%E3%81%AA/hhd800.com%40GVH-497.mp4',
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="folder">
          <File folder={props} clickHandler={handleClick} />
        </div>
      </LayOut>
    );
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: [] } }],
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const res = await axios.get('http://localhost/api/');
  return { props: res.data, revalidate: 60 };
}
