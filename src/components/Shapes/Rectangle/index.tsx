import React, { Ref } from 'react';
import { ShapeConfig, ShapeSizeResizer, ShapeSize } from '../ShapeEditor';

import './style.css';

export class RectangleProps extends ShapeConfig implements ShapeSizeResizer {   
     onResize = (val: ShapeSize) => {}
}

export default class Rectangle extends React.Component<RectangleProps> {

    elementRef : Ref<any> = React.createRef();
    observer: any = null;

    componentDidMount() {
        this.observer = new (window as any).ResizeObserver(this.onResize);
        this.observer.observe((this.elementRef as any).current);
    }

    componentWillUnmount() {
        this.observer.disconnect();
        this.observer.unobserve(this.onResize);
    }

    onResize = () => {
        this.props.onResize({
            height: (this.elementRef as any).current.clientHeight,
            width: (this.elementRef as any).current.clientWidth
        })
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