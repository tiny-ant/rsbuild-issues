import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import spriteStr from 'common/assets/symbols.svg?raw';
// 
// function loadSprite() {
//   const div = document.createElement('div');
//   div.innerHTML = `<svg style="position: absolute; width: 0px; height: 0px; overflow: hidden;">${spriteStr}</svg>`;

//   if (!div.firstChild) {
//     return;
//   }

//   if (document.body.firstElementChild) {
//     document.body.insertBefore(div.firstChild, document.body.firstElementChild);
//   } else {
//     document.body.appendChild(div.firstChild);
//   }
// }
// loadSprite();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
