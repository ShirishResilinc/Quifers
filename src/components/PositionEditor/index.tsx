import React from 'react';

export interface PositionEditorProps {
    xPos: number;
    yPos: number;
    onXPosChange?: (xPos: number) => void;
    onYPosChange?: (yPos: number) => void;
    onPosChange?: (xPos: number, yPos: number) => void;
}

export function PositionEditor(props: PositionEditorProps) {
    const onPosChange = React.useCallback((changedValue: number, { xPos, yPos }: { xPos: number, yPos: number }, specificPosChange?: (pos: number) => void) => {
        if (!!specificPosChange) {
            specificPosChange(changedValue);
        }
        if (!!props.onPosChange) {
            props.onPosChange(xPos, yPos);
        }
    }, []);

    return (
        <div className="position-editor-container">
            <span>X: <input type="number" value={props.xPos} onChange={
                (e) => onPosChange(+e.target.value, { xPos: +e.target.value, yPos: props.yPos }, props.onXPosChange)} />
            </span> &nbsp; | &nbsp;
            <span>Y: <input type="number" value={props.yPos} onChange={
                (e) => onPosChange(+e.target.value, { xPos: props.xPos, yPos: +e.target.value }, props.onYPosChange)} />
            </span>
        </div>
    )
}