import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  const intervalID = setInterval(function () {
    const iframe = document.getElementsByTagName('iframe');
    if (iframe.length > 0) {
      iframe[0].remove();
      clearInterval(intervalID);
    }
  }, 500);
}
