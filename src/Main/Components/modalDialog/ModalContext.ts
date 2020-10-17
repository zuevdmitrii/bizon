import * as React from 'react'


const ModalContext = React.createContext({} as {
  registr: (fn: () => void) => void
  unregistr: (fn: () => void) => void 
})

export { ModalContext }
