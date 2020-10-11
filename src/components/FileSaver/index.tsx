import React, { useState, useEffect } from 'react';

export interface FileSaverProps {
    fileName: string;
    onFileSave: (shape: string) => void;
}

export function FileSaver(props: FileSaverProps) {

    const [fileName, setFileName] = useState('');

    const onSelectChangeHandler = (e: any) => {
        setFileName(e.target.value);
    }

    useEffect(() => {
        setFileName(props.fileName || '');
    }, [props.fileName])

    const onAddClickHandler = () => {
        props.onFileSave(fileName);
    }

    return (
        <div className="file-saver-container">
            <input value={fileName} onChange={(e) => onSelectChangeHandler(e)} placeholder="Enter File Name"/>
            <button disabled={!fileName} type="button" onClick={() => onAddClickHandler()}>Add</button>
        </div>
    )
}