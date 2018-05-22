import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import ItemForm from './components/itemform';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ItemForm />, document.getElementById('root'));
registerServiceWorker();
