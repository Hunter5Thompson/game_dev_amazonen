//audioplayer.jsx

import React from 'react';

const AudioPlayer = React.forwardRef((props, ref) => {
    return (
        <audio src="/rainforest-sound.mp3" autoPlay loop ref={ref} />
    );
  });

export default AudioPlayer;
