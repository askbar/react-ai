import React from 'react';
// import * as ml5 from 'ml5';

// import img from '../media/things.jpg';
import img from '../media/things.png';

class PageRegression extends React.Component {
    constructor(props) {
        super();
        this.state = { things: false };
    }

    render() {
        return (
            <>
                <h1>Regression training</h1>
                <canvas ref="canvas" width={this.state.width} height={this.state.height} />
                <img ref="image" src={img} alt="" style={{ display: 'none' }} />
                <video ref="video" />
            </>
        );
    }
}

export default PageRegression;
