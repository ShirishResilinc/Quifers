import React, { useRef, Ref } from 'react';
import { ShapeConfig, ShapeSizeResizer, Shape, ShapeSize } from '../ShapeEditor';

import './style.css';

export class RectangleProps extends ShapeConfig implements ShapeSizeResizer {   
     onResize = (val: ShapeSize) => {}
}

export default class Rectangle extends React.Component<RectangleProps> {

    elementRef : Ref<any> =null;
    observer: any = null;

    componentDidMount() {
        this.observer = new (window as any).ResizeObserver();
        this.observer.observe(this.elementRef);
    }

    componentWillUnmount() {
        this.observer.disconnect();
        this.observer.unobserve();
    }

    render() {

        return (
            <div className="rectangle-shape-container" style={{
                height: this.props.height,
                width: this.props.width
                }} ref = {this.elementRef}>
                
            </div>
        );
    }
}