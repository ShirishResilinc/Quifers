import React, { useState, useEffect } from 'react';

export interface FileSaverProps {
    fileName: string;
    onFileSave: (shape: string) => void;
}

const shapes = ['Rectangle', 'Square'];

export function FileSaver(props: FileSaverProps) {

    const [fileName, setFileName] = useState('');

    const onSelectChangeHandler = (e: any) => {
        setFileName(e.target.value);
    }

    useEffect(() => {
        setFileName(props.fileName);
    }, [props.fileName])

    const onAddClickHandler = () => {
        props.onFileSave(fileName);
    }

    return (
        <div className="select-shape-container">
            <select value={fileName} onChange={(e) => onSelectChangeHandler(e)} placeholder="Select Shape">
                {shapes.map(shape => (<option key={shape} value={shape}>{shape}</option>))}
            </select>
            <button disabled={!fileName} type="button" onClick={() => onAddClickHandler()}>Add</button>
        </div>
    )
}