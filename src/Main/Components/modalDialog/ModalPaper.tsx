import * as React from 'react'
import classNames from 'classnames'
import { View } from '../View'
import { ModalContext } from './ModalContext'
// import styles from './ModalPaper.module.scss'
import { useEffect, useMemo } from 'react'
import { Button } from '../Button'

interface IProps {
  closeModal: () => void
  children: any
  size?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const ModalPaper = ({ children, closeModal, size }: IProps) => {
  const forContextCallback = useMemo(
    () => ({
      unregistr: (fn: () => void) => {},
    }),
    []
  )
  useEffect(() => {
    return () => {
      if (forContextCallback.unregistr) {
        forContextCallback.unregistr(closeModal)
      }
    }
  }, [])
  return (
    <ModalContext.Consumer>
       {modalContext => {
        modalContext.registr(closeModal)
        forContextCallback.unregistr = modalContext.unregistr
        return (
          <View style={'overlay'} onTouchStart={closeModal}>
            <View
              style={classNames(
                'window',
                `${[`window_${size}`]}`
              )}
              onTouchStart={e => {
                e.stopPropagation()
              }}
            >
              <View style={'header'}>
                <Button className={'close'} onClick={closeModal} icon={'fa fa-close'}/>
                  
              </View>
              <View style={classNames('children', 'scroll-anchor')}>{children}</View>
            </View>
          </View>
        )
      }} 
    </ModalContext.Consumer>
  )
}
