import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = React.PropsWithChildren<{}>;

const LottiePlayer = (props: Props) => {
  return (
    <Player
      autoplay
      loop
      // TODO(Teddy): Change to use local json
      src="https://assets9.lottiefiles.com/datafiles/SkdS7QDyJTKTdwA/data.json"
      style={{ height: '200px', width: '200px' }}
    />
  );
};

export default LottiePlayer;
