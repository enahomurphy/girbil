import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@shared/style/default.css';

import App from './App';

const mountNode = document.getElementById('app');
ReactDOM.render(<App name="Jane" />, mountNode);
