import { observable, action, runInAction, computed } from "mobx";
import axios from 'axios';
import { Shape } from "../components/Shapes/ShapeEditor";

export class File {
    id: number = 0;
    name: string = '';
    shapes: Shape[] = [];
}

class EditorStore {
    @observable files: any[] = [{
        id: 0,
        name: 'File',
        shapes: [{
            id: 0,
            shape: 'Rectangle',
            shapeConfig: {
                x: 100,
                y: 100,
                height: 100,
                width: 100
            }
        }
        ]
    }];
    @observable loading = false;
    @observable selectedFileName = 'File';
    @computed get selectedFile() {
        return this.files.find((file: File) => file.name === this.selectedFileName) || {};
    }
    @computed get fileNames() {
        return this.files.map(({ name }) => name);
    }

    @action
    setSelectedFileName(fileName: string) {
        this.selectedFileName = fileName;
    }

    @action
    addShape(shape: string) {
        const fileIndex = this.files.findIndex((file) => this.selectedFileName === file.name);
        if (fileIndex !== -1) {
            this.files[fileIndex].shapes.push({
                id: this.files[fileIndex].shapes.length + 1,
                shape: 'Rectangle',
                shapeConfig: {
                    x: 100,
                    y: 100,
                    height: 100,
                    width: 100
                }
            })
        }
    }

    @action
    updateShape(shape: Shape) {
        const fileIndex = this.files.findIndex((file) => this.selectedFileName === file.name);
        if (fileIndex !== -1) {
            const shapeIndex = this.files[fileIndex].shapes.findIndex((shapeObj:Shape) => shapeObj.id === shape.id)
            this.files[fileIndex].shapes.splice(fileIndex, 1, ).push({
                ...this.files[fileIndex].shapes[shapeIndex],
                shapeConfig: {
                    ...this.files[fileIndex].shapes[shapeIndex].shapeConfig
                }
            })
        }
    }

    fetchSavedFiles() {
        return axios.get('/files')
    }

    @action
    loadFiles() {
        this.loading = true;
        this.fetchSavedFiles().then((res: any) => {
            runInAction(() => {
                this.files = res;
            })
        }).finally(() => {
            runInAction(() => {
                this.loading = false;
            })
        })
    }

    createFile(file: File) {
        axios.post('/files', file)
    }

    updateFile(file: File) {
        axios.put('/files', file)
    }
}

const store = new EditorStore();

export default store;