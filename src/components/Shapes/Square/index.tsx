import React from 'react';
import { ShapeConfig, ShapeSizeResizer } from "../ShapeEditor";
import Rectangle from '../Rectangle';

export interface SquareProps extends ShapeConfig, ShapeSizeResizer {
}


export default function SquareShape(props: SquareProps) {

    return (
        <React.Fragment>
            <Rectangle 
            x={props.x} y={props.y} 
            rotate={props.rotate} 
            height={props.height} 
            width={props.width} 
            onResize={props.onResize} />
        </React.Fragment>
    )
}