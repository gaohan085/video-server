import "plyr-react/plyr.css";
import styled from "styled-components";
import { APITypes, PlyrProps, usePlyr } from "plyr-react";
import { forwardRef, Ref, useRef } from "react";
import { selectPlaySrc, useAppSelector } from "../src/store";

const Plyr = forwardRef(function Player(props: PlyrProps, ref: Ref<APITypes>) {
  const { source, options = null, ...rest } = props;
  const raptorRef = usePlyr(ref, {
    source,
    options,
  });

  return <video ref={raptorRef} className="plyr-react plyr" {...rest} />;
});

const Video = styled.div`
  width: 80%;
  .videoBox {
    padding: 50px;
    max-height: 800px;

    p {
      color: #00b2ff;
      font-size: 17px;
      font-weight: 800;
    }
  }
`;

export default function Player() {
  const ref = useRef<APITypes>(null);
  const playSrc = useAppSelector(selectPlaySrc);
  return (
    <Video>
      <div className="videoBox">
        <Plyr
          ref={ref}
          source={{
            type: "video",
            sources: [
              {
                src: playSrc,
              },
            ],
          }}
          options={{ autoplay: true, clickToPlay: true }} //Set initinal player status as pause
        />
        <p>Now Playing: {playSrc.slice(playSrc.lastIndexOf("/") + 1)}</p>
      </div>
    </Video>
  );
}
