import * as React from 'react';
import { Link } from 'react-router-dom';


export const PageTemplate = (props: any) => {
  return <div>
    <div className='menu'>
      <Link to={`/`} className='list__row-wrapper'>Главная</Link>
      <Link to={`/employes`} className='list__row-wrapper'>Сотрудники</Link>
    </div>
    <div>
      {props.children}
    </div>
  </div>
}