import React from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { getRandomHexColor } from '../util/color';
import { compareObj } from '../util/objects';

// import img from '../media/things.jpg';
import img from '../media/things.png';

// https://github.com/tensorflow/tfjs-models/tree/master/posenet

class PageMobilenet extends React.Component {
    constructor(props) {
        super();
        this.state = { things: false };
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.img = this.refs.image;

        this.img.onload = () => {
            this.setState({
                ...this.state,
                height: this.img.height,
                width: this.img.width
            });
        };
    }

    findThings = async () => {
        // load the posenet model from a checkpoint
        const coco = await cocoSsd.load();
        const list = await coco.detect(this.img);

        const mobile = await mobilenet.load();
        console.log(await mobile.classify(this.img));

        return list;
    };

    render() {
        this.findThings(img).then(list => {
            if (!compareObj(list, this.state.things)) {
                this.setState({ ...this.state, things: list });
            }
        });

        if (this.state.things) {
            this.ctx.drawImage(this.img, 0, 0);
            this.state.things.forEach(thing => {
                // console.log(thing);
                this.ctx.strokeStyle = this.ctx.fillStyle = getRandomHexColor();
                this.ctx.lineWidth = 2;

                this.ctx.beginPath();
                this.ctx.rect(thing.bbox[0], thing.bbox[1], thing.bbox[2], thing.bbox[3]);
                this.ctx.stroke();

                this.ctx.font = '20px Courier';
                this.ctx.fillText(thing.class, thing.bbox[0] + 2, thing.bbox[1] + 16);
            });
        }

        return (
            <>
                <h1>Things by Coco SD</h1>
                <canvas ref="canvas" width={this.state.width} height={this.state.height} />
                <img ref="image" src={img} alt="" style={{ display: 'none' }} />
            </>
        );
    }
}

export default PageMobilenet;
