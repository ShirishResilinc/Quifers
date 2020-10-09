import React from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import store from './models';
import { Editor } from './views/Editor';

const App: React.FC = () => {
  return (
    <Provider {...store}>
      <div>
        <Editor />
      </div>
    </Provider>
  );
};

export default App;
