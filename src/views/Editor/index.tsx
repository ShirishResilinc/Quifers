import React from 'react';
import { ShapeEditor, ShapeConfig, Shape } from "../../components/Shapes/ShapeEditor";
import { FileSelector } from '../../components/FileSelector';
import { AddShape } from '../../components/AddShape';

import './styles.scss';
import { FileSaver } from '../../components/FileSaver';
import { observer, inject } from 'mobx-react';
import { File } from '../../models/EditorStore';

export interface EditorProps {
    files: File[];
    selectedFile: File;
    fileNames: string[];
}

@inject('editorStore')
@observer
export class Editor extends React.Component<any> {

    onShapeUpdateHandler = (updates: ShapeConfig) => {
        this.props.editorStore.updateFile({
            ...this.props.editorStore.selectedFile,
            shapeConfig: {
                ...this.props.editorStore.selectedFile,
                ...updates
            }
        })
    }

    onAddShapeHandler = (shape: string) => {
        this.props.editorStore.addShape()
    }

    fileSelectorHandler = (fileName: string) => {

    }

    fileSaveHandler = (fileName: string) => {

    }

    render() {

        return (
            <div className="editor-container">
                <div className="editor-toolbar">
                    <FileSelector selectedFileName={this.props.editorStore.selectedFile.name} files={this.props.editorStore.fileNames} onFileSelect={(fileName) => this.fileSelectorHandler(fileName)} />
                    <AddShape onAddShape={(shape) => this.onAddShapeHandler(shape)} />
                    <FileSaver fileName={this.props.editorStore.selectedFile.name} onFileSave={(fileName) => this.fileSaveHandler(fileName)} />
                </div>
                <div className="editor-area">
                    {(this.props.editorStore.selectedFile.shapes || []).map((shape: Shape) =>
                        <ShapeEditor
                            key={shape.id}
                            id={shape.id}
                            shape={shape.shape}
                            shapeConfig={shape.shapeConfig}
                            onShapeUpdated={(updates) => this.onShapeUpdateHandler(updates)}
                        />)}
                </div>
            </div>
        );
    }
}
