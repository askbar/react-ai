import React, { useState } from 'react';
import getUserIP from '../util/ip';
import QRCode from 'qrcode';

const PageHome = () => {
    const [ip, setIp] = useState('');
    const [qr, setQr] = useState('');
    const webaddr = `http://${ip}:${window.location.port}`;

    try {
        QRCode.toDataURL(webaddr).then(imgData => setQr(imgData));
        getUserIP(addr => {
            if (ip !== addr) setIp(addr);
        });
    } catch (err) {}

    return (
        <>
            <img src={qr} alt="" />
            <ul>
                <li>Get online through top-extern wifi (pass 43f578a2367e5732d576a23ae45e)</li>
                <li>
                    Load my demo app directly on
                    <a target="_new" href={webaddr}>
                        {webaddr}
                    </a>
                </li>

                <li>
                    Or clone from{' '}
                    <a href="https://github.topdanmark.local/syj/ai-workshop/" target="_new">
                        github.topdanmark.local/syj/ai-workshop
                    </a>
                </li>
            </ul>

            <ol>
                <li>
                    Velkommen - baseret på <a href="https://andreasrefsgaard.dk/">Andreas Refsgaard</a>
                </li>
                <li>
                    Vi gennemgår ca. 6 AI modeller, lidt kode, lidt perspektiv efter 40 min skal I slippes I løs og der
                    er fri leg
                </li>
                <ul>
                    <li>
                        <strong>Posenet</strong> Kan laves som videofeed, med streger mellem relevante kropsdele styr
                        website med kroppen, hvor kigger folk hen? andre anvendelsesmuligheder?
                        <br />
                        <a href="https://editor.p5js.org/askbar/sketches/6cBGiXJx9" target="_new">
                            cam sketch
                        </a>
                        {' - '}
                        <a href="https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html" target="_new">
                            cam demo
                        </a>
                    </li>
                    <li>
                        <strong>CocoSD / mobilenet Genkend objekter</strong> console: probability lad brugeren vise os
                        sit indbo og vi genkender dyre designerting
                    </li>
                    <li>
                        <strong>Classification</strong> Giv algoritmen et par klassificeringer og den prøver at genskabe
                        disse
                        <br />
                        <a target="_new" href="https://editor.p5js.org/askbar/sketches/j6qpVkx-D">
                            classification simple
                        </a>
                        {' - '}
                        <a target="_new" href="https://teachablemachine.withgoogle.com/">
                            Google teachablemachine
                        </a>
                        {' - '}
                        <a target="_new" href="https://editor.p5js.org/AndreasRef/sketches/RLv1QbuLa">
                            Advanced classification
                        </a>
                    </li>
                    <li>
                        <strong>Regression</strong> Giv algoritmen 2-3 punkter og den finder selv gråtonerne imellem
                        <br />
                        <a target="_new" href="https://editor.p5js.org/AndreasRef/sketches/Z2OChCuHk">
                            version 1
                        </a>
                        {' - '}
                        <a target="_new" href="https://editor.p5js.org/AndreasRef/sketches/HyEDToYnQ">
                            version 2
                        </a>
                    </li>
                    <li>
                        <strong>Face recognition</strong>
                        <br />
                        <a target="_new" href="https://editor.p5js.org/AndreasRef/sketches/2ElDbMuHT">
                            version 1
                        </a>
                        {' - '}
                        <a target="_new" href="https://andreasref.github.io/ml/Face-Detection-JavaScript_web/">
                            version 2
                        </a>{' '}
                        (
                        <a
                            target="_new"
                            href="https://github.com/AndreasRef/andreasref.github.io/tree/master/ml/Face-Detection-JavaScript_web"
                        >
                            source
                        </a>
                        )
                    </li>
                    <li>
                        <strong>Talk with Annyang</strong> Voice commands
                    </li>
                </ul>
                <li>AI as a service - der kommer flere muligheder for drag'n'drop AI modeller ex. Lobe.ai og Runway</li>
                <li>Fri leg - i grupper eller hver for sig</li>
            </ol>
        </>
    );
};

export default PageHome;
