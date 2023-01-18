import 'plyr-react/plyr.css';
import { APITypes, PlyrProps, usePlyr } from 'plyr-react';
import React from 'react';

// eslint-disable-next-line react/display-name
const Plyr = React.forwardRef((props: PlyrProps, ref: React.Ref<APITypes>) => {
  const { source, options, ...rest } = props;
  const raptorRef = usePlyr(ref, {
    source,
    options,
  });

  return <video ref={raptorRef} className="plyr-react plyr" {...rest} />;
});

export default Plyr;
