import { observable, action, runInAction, computed } from "mobx";
import axios from 'axios';
import { Shape } from "../components/Shapes/ShapeEditor";

export class File {
    id: number = 0;
    name: string = '';
    shapes: Shape[] = [];
}

class EditorStore {
    @observable.shallow files: any[] = []
    @observable loading = false;
    @observable selectedFile: File = null;
    @computed selectedFile = () => {
        return this.files.find((file: File) => file.name === (this.selectedFile || {} as File).name);
    }
    @computed fileNames = () => {
        return this.files.map(({ name }) => name);
    }

    @action
    setSelectedFileName(fileName: string) {
        this.selectedFileName = fileName;
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