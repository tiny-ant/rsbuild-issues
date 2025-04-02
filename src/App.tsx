
import iconStr from './icon.svg?raw';
import cssStr from './test.css?raw';
import spriteStr from 'common/assets/symbols.svg?raw';

import './App.css'

export default function () {

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        whiteSpace: 'wrap',
        wordBreak: 'break-all'
      }}
    >
      <p>{iconStr}</p>
      <br />
      <p>{cssStr}</p>
      <br />
      <p>{spriteStr}</p>
    </div>
  );
}
