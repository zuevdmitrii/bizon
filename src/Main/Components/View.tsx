import { SyntheticEvent } from "react"
import * as React from 'react'

interface IViewProps {
    style?: any
    id?: string  
    children?: any
    tabIndex?: number
    onTouchStart?: (e: React.MouseEvent) => void
    onFocus?: () => void
    onBlur?: (event?: SyntheticEvent<Element, FocusEvent>) => void
    onMouseOver?: () => void
    onMouseLeave?: () => void
    onPress?: (e: React.MouseEvent) => void
  }

  
export const View = React.forwardRef<HTMLDivElement, IViewProps>(({
    style,
    id,
    children,
    tabIndex,
    onTouchStart,
    onFocus,
    onBlur,
    onMouseOver,
    onMouseLeave,
    onPress,
  }: IViewProps, ref) => {
    return (
      <div
        className={style}
        id={id}
        ref={ref}
        onMouseDown={onTouchStart}
        tabIndex={tabIndex}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={onPress}
      >
        {children}
      </div>
    )
  })