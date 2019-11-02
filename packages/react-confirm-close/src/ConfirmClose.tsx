import React, { useState } from 'react'
import { Modal } from 'antd'
import {
  ChangeHandler,
  ConfirmCloseChildComponent,
  ConfirmCloseComponent,
  ConfirmCloseConfig,
  RequiredProps,
} from './types'

export const confirmClose = <TOriginalProps extends RequiredProps>({
  changeEvent = 'onChange',
}: ConfirmCloseConfig = {}) => (
  Component: ConfirmCloseChildComponent<TOriginalProps>,
): ConfirmCloseComponent<TOriginalProps> => {
  return props => {
    const [isDirty, setIsDirty] = useState(false)
    const onChange: ChangeHandler = (...args) => {
      setIsDirty(false)
      if (props.onClean) props.onClean()
      const changeHandler = props[changeEvent] as ChangeHandler
      changeHandler(...args)
    }
    const onClose = () => {
      if (isDirty) {
        Modal.confirm({
          title: 'You have unsaved changes.',
          content: 'You will lose them if you continue. Are you sure you want to close this?',
          onOk: props.onClose,
          width: 500,
          cancelText: 'Go Back & Keep Changes',
          okText: 'Continue Without Saving',
        })
      } else {
        props.onClose()
      }
    }
    const wrappedProps = {
      ...props,
      [changeEvent]: onChange,
      onClose,
      onDirty: () => {
        setIsDirty(true)
        if (props.onDirty) props.onDirty()
      },
    }
    return <Component {...wrappedProps} />
  }
}
