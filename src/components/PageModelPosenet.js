import React from 'react';
import * as posenet from '@tensorflow-models/posenet';
import { getRandomHexColor } from '../util/color';
import { compareObj } from '../util/objects';

import img from '../media/cheerleader.jpg';
// import img from '../media/jumping-people.jpg';

// https://github.com/tensorflow/tfjs-models/tree/master/posenet

class PageModelPosenet extends React.Component {
    constructor(props) {
        super();
        this.state = { poses: false };
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

    estimatePoseOnImage = async () => {
        // load the posenet model from a checkpoint
        const net = await posenet.load();

        const pose = await net.estimateSinglePose(this.img, {
            flipHorizontal: false
        });
        const poseList = [pose];

        // const poseList = await net.estimateMultiplePoses(image, {
        //     flipHorizontal: false,
        //     maxDetections: 10,
        //     scoreThreshold: 0.5,
        //     nmsRadius: 20
        // });

        return poseList;
    };

    render() {
        this.estimatePoseOnImage(img).then(pose => {
            if (!compareObj(pose, this.state.poses)) {
                this.setState({ ...this.state, poses: pose });
            }
        });

        if (this.state.poses) {
            this.ctx.drawImage(this.img, 0, 0);

            this.state.poses.forEach(pose => {
                this.ctx.fillStyle = getRandomHexColor();

                pose.keypoints.forEach(point => {
                    this.ctx.fillRect(point.position.x, point.position.y, 10, 10);
                    this.ctx.font = '14px Courier';
                    this.ctx.fillText(point.part, point.position.x, point.position.y);
                    console.table(point);
                });
            });
        }

        return (
            <>
                <h1> Posenet </h1>
                <canvas ref="canvas" width={this.state.width} height={this.state.height} />
                <img ref="image" src={img} alt="" style={{ display: 'none' }} />
            </>
        );
    }
}

export default PageModelPosenet;
