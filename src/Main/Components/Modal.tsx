import * as React from 'react'
import "./Modal.less";

interface IModalProps {
  children: any
  onClose: () => void  
}

export const Modal = (props: IModalProps) => {
  return <div className='overlay' onClick={props.onClose}>
    <div className='body'>
      {props.children}
    </div>
  </div>
}