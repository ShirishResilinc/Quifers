import React from 'react';
import { PositionEditor } from '../PositionEditor';
import './style.css';

export class ShapeSize {
    height: number = 0;
    width: number = 0;
}

export class ShapeConfig extends ShapeSize {
    x: number = 0;
    y: number = 0;
    rotate: number = 0;

    constructor(...args: any) {
        super();
        if (args[0] instanceof ShapeConfig) {
            const { x, y, rotate, height, width } = args[0];
            this.x = x;
            this.y = y;
            this.rotate = rotate;
            this.height = height;
            this.width = width;
        } else {
            this.x = args[0];
            this.y = args[1];
            this.rotate = args[2];
            this.height = args[3];
            this.width = args[4];
        }
    }
}

export interface ShapeSizeResizer {
    onResize: ({ width, height }: ShapeSize) => void
}

export interface ShapeProps extends Shape {
    onShapeUpdated: (updates: ShapeConfig) => void
};

export interface Shape {
    id: number;
    shape: string;
    shapeConfig: ShapeConfig;
}

export class ShapeEditor extends React.Component<ShapeProps> {
    state = {
        component: null,
        loading: false
    }

    componentWillMount() {
        this.loadComponent();
    }

    private loadComponent() {
        if (!this.state.component && this.props.shape) {
            this.setState({
                loading: true
            })
            import(`./${this.props.shape.toLocaleLowerCase()}`).then((cmp) => {
                this.setState((prevState) => ({
                    ...this.state, component: cmp.default
                }));
            }).finally(() => {
                this.setState((prevState) => ({ ...prevState, loading: false }))
            })
        }
    }

    handleShapeResize({ width, height }: ShapeSize) {
        this.props.onShapeUpdated(new ShapeConfig(this.props.shapeConfig));
    }

    componentDidUpdate(prevProps: Readonly<ShapeProps>) {
        if (prevProps.shape !== this.props.shape && this.props.shape) {
            this.loadComponent();
        }
    }

    onPositionUpdated({ xPos, yPos }: { xPos: number, yPos: number }) {
        this.props.onShapeUpdated({ ...new ShapeConfig(this.props.shapeConfig), x: xPos, y: yPos });
    }

    render() {
        const C = this.state.component as any;

        return (
            <div className="shape-container" style={{
                top: (this.props.shapeConfig || {}).x || 0,
                left: (this.props.shapeConfig || {}).y || 0
            }}>
                {
                    !this.state.loading &&
                    <div className="shape-editor-area" >
                        <div className="shape-editor-area-position-editor-section">
                            <PositionEditor
                                xPos={this.props.shapeConfig.x}
                                yPos={this.props.shapeConfig.y}
                                onPosChange={(val: any) => this.onPositionUpdated(val)}
                            />
                        </div>
                        <C {...{
                            ...this.props.shapeConfig,
                            onResize: (val: ShapeSize) => { this.handleShapeResize(val) }
                        }} />
                    </div>
                }
                {
                    this.state.loading && 'Shape is loading...'
                }
            </div >
        )
    }
}