import React, { useState } from 'react'
import { Modal } from 'antd'
import {
  ChangeHandler,
  ConfirmCloseChildComponent,
  ConfirmCloseComponent,
  ConfirmCloseConfig,
  RequiredProps,
} from './types'
import { Prompt } from 'react-router-dom'

export const confirmClose = <TOriginalProps extends RequiredProps>({
  changeEvent = 'onChange',
}: ConfirmCloseConfig = {}) => (
  Component: ConfirmCloseChildComponent<TOriginalProps>,
): ConfirmCloseComponent<TOriginalProps> => {
  return props => {
    const [isDirty, setIsDirty] = useState(false)
    let justChanged = false // TODO: Is this the proper way to handle this with useState?
    const onChange: ChangeHandler = (...args) => {
      setIsDirty(false)
      justChanged = true
      if (props.onClean) props.onClean()
      const changeHandler = props[changeEvent] as ChangeHandler
      changeHandler(...args)
    }
    const onClose = () => {
      if (isDirty && !justChanged) {
        Modal.confirm({
          title: 'You have unsaved changes.',
          content: 'You will lose them if you continue. Are you sure you want to close this?',
          onOk: props.onClose,
          width: 650,
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
    return (
      <>
        <Prompt
          when={isDirty}
          message={'You will lose them if you continue. Are you sure you want to close this?'}
        />
        <Component {...wrappedProps} />
      </>
    )
  }
}
