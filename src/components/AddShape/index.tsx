import React, { useState } from 'react';

export interface AddShapeProps {
    onAddShape: (shape: string) => void;
}

const shapes = ['Rectangle', 'Square'];

export function AddShape(props: AddShapeProps) {

    const [selectedShape, setSelectedShape] = useState('');

    const onSelectChangeHandler = (e: any) => {
        setSelectedShape(e.target.value);
    }

    const onAddClickHandler = () => {
        props.onAddShape(selectedShape);
    }

    return (
        <div className="select-shape-container">
            <select value={selectedShape} onChange={(e) => onSelectChangeHandler(e)} placeholder="Select Shape">
                {shapes.map(shape => (<option key={shape} value={shape}>{shape}</option>))}
            </select>
            <button disabled={!selectedShape} type="button" onClick={() => onAddClickHandler()}>Add</button>
        </div>
    )
}