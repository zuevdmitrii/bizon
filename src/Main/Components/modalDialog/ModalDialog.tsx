import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'

import { ModalPaper } from './ModalPaper'

export interface IModalContent {
  value?: string
  closeModal: () => void
  onSave?: (value: string) => void
}

export function ModalDialog<T>(props: {
  show?: boolean
  children?: any
  size?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  content: (props: T & IModalContent) => JSX.Element
  contentProps?: T
  onSave?: (value: string) => void
  onClose?: () => void
  value?: string
}) {
  const [show, setShow] = useState(false)
  const {  content } = props

  useEffect(() => {
    if (props.show !== undefined) {
      setShow(props.show)
    }
  }, [props.show])

  const closeModal = useMemo(
    () => (e?: any) => {
      e && e.stopPropagation()
     
      setShow(false)
      if (show !== undefined && props.onClose) {
        props.onClose()
      }
    },
    []
  )

  const ContentComp = content

  const contentProps: T & IModalContent = {
    ...props.contentProps,
    closeModal,
    value: props.value,
    onSave: props.onSave,
  } as T & IModalContent

  return (
    <>
      {show && (
        <ModalPaper closeModal={closeModal} size={props.size}>
          <ContentComp {...contentProps} />
        </ModalPaper>
      )}
    </>
  )
}
