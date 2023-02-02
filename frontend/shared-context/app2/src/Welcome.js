import { NameContextProvider } from '@shared-context/shared-library';
import React from 'react';

import css from "./Welcome.css";


const Welcome = () => {
  const name = React.useContext(NameContextProvider);

  return <div className='MainGrid'>
    <p className='Title'>My Farm</p>
    <div className='Ressource'>
      <br/>
      <div>Money : {Intl.NumberFormat().format(name[0])} $</div>
    </div>
    <div className='Ressource'>
      <br/>
      <div>Milk : {Intl.NumberFormat().format(name[1])} L</div>
    </div>
  </div>;
};

export default Welcome;
