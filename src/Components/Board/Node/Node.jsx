import React, {Component} from 'react';
import './NodeStyle.css'
 class Node extends Component{  
    render(){
        const {
            col,
            row,
            iswall,
            isStart,
            isFinshed,
            mouseDown,
            mouseUp,
            mouseOnHold
        } = this.props;
        const nodeClass = isFinshed ? "node-finish": isStart ? "node-start" : iswall ? "node-wall" : ""
        return(
            <div
            id = {'node-'+col+'-'+row}
            className={'node ' + nodeClass } 
            onMouseDown = {() => mouseDown(col , row)}
            onMouseEnter = {() => mouseOnHold(col , row)}
            onMouseUp = {() => mouseUp()}
            > 
            </div>
        );
    }
}

export default Node;
