/*
	This file holds my application loader
*/

// Import React, ReactDOM, app, and service worker
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Import styling
import './index.css';

// Import browser router from react
import { BrowserRouter } from "react-router-dom"

// Import font awesome and populate library
import { library } from '@fortawesome/fontawesome-svg-core'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faMinus, faPlus, faChevronDown, faHeart } from '@fortawesome/free-solid-svg-icons'
library.add(faApple, faMinus, faPlus, faChevronDown, faHeart)

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
