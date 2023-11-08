import React, { useState } from 'react'
import ReactHowler from 'react-howler'

const Sound = () => {
    const [play, setPlay] = useState(false);
    return (
        <div>
            <ReactHowler src='./mixkit-correct-answer-tone-2870.mp3' playing={play} />
            <button onClick={() => setPlay(!play)}>
                {play ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default Sound;