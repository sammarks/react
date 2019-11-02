import React, { useState } from 'react'
import { confirmClose, ConfirmCloseComponent } from '@sammarks/react-confirm-close'
import styled, { StyledComponent } from 'styled-components'
import { Modal, Button } from 'antd'
import { MarkdownEditor, MarkdownEditorProps } from './MarkdownEditor'
import { EditorTheme } from '../../types'

interface MarkdownModalProps extends Omit<MarkdownEditorProps, 'defaultValue'> {
  defaultValue?: string
  visible?: boolean
  onClose: () => void
}

export const MarkdownModal: StyledComponent<
  ConfirmCloseComponent<MarkdownModalProps>,
  EditorTheme
> = styled(
  confirmClose<MarkdownModalProps>()(
    ({ visible, onDirty, onChange, className, defaultValue, onClose, ...props }) => {
      const [value, setValue] = useState(defaultValue)
      return (
        <Modal
          visible={visible}
          onCancel={onClose}
          title={'Edit Content'}
          width={800}
          style={{ maxWidth: '90vw' }}
          footer={[
            <Button key={'cancel'} onClick={onClose}>
              Close
            </Button>,
            <Button
              key={'done'}
              type={'primary'}
              onClick={() => {
                onChange(value)
                onClose()
              }}
            >
              Save
            </Button>,
          ]}
        >
          <div className={className}>
            <MarkdownEditor
              onChange={value => {
                setValue(value)
                onDirty()
              }}
              value={value}
            />
          </div>
        </Modal>
      )
    },
  ),
)`
  textarea {
    width: 100%;
  }
`
