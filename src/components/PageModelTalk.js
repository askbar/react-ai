import React, { useState } from 'react';
import annyang from 'annyang';

const PageModelTalk = () => {
    const [word, setWord] = useState('');
    const command = {
        'hello :thing': function(thing) {
            setWord(thing);
        }
    };

    try {
        annyang.addCommands(command);
        annyang.start({ autoRestart: true, continuous: true });
    } catch (err) {
        console.log('error: ');
        console.log(err);
    }

    return (
        <>
            <p>Did you say anything ?</p>
            {word && (
                <p>
                    <strong>{word}</strong>
                </p>
            )}
        </>
    );
};

//https://www.tensorflow.org/js/models

export default PageModelTalk;
