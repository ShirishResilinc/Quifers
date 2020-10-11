import React, { useState, useEffect } from 'react';

export interface FileSelectorProps {
    selectedFileName: string;
    files: string[];
    onFileSelect: (fileName: string) => void;
}

export function FileSelector(props: FileSelectorProps) {

    const [selectedFile, setSelectedFile] = useState('');

    const onSelectChangeHandler = (e: any) => {
        setSelectedFile(e.target.value);
    }

    const onSelectClickHandler = () => {
        props.onFileSelect(selectedFile);
    }

    useEffect(() => {
        setSelectedFile(props.selectedFileName);
    }, [props.selectedFileName])

    return (
        <div className="select-file-container">
            <select disabled={!props.files.length} value={selectedFile} onChange={(e) => onSelectChangeHandler(e)} placeholder="Select File">
                {props.files.map(shape => (<option key={shape} value={shape}>{shape}</option>))}
            </select>
            <button disabled={!selectedFile} type="button" onClick={() => onSelectClickHandler()}>Select</button>
        </div>
    )
}