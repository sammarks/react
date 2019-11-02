import React, { useState } from 'react'
import { Drawer, Button } from 'antd'
import styled, { StyledComponent } from 'styled-components'
import { confirmClose, ConfirmCloseComponent } from '@sammarks/react-confirm-close'
import { Editor, EditorProps } from './Editor'
import { EditorTheme, Widgets } from './types'
import { DrawerProps } from 'antd/lib/drawer'

export interface EditorDrawerProps {
  defaultValue?: Widgets
  onChange: (value: Widgets) => void
  visible?: boolean
  onClose: () => void
  loading?: boolean
  drawerProps?: Partial<DrawerProps>
  editorId: EditorProps['editorId']
  editorProps?: Partial<EditorProps>
  className: string
}

export const EditorDrawer: StyledComponent<
  ConfirmCloseComponent<EditorDrawerProps>,
  EditorTheme
> = styled(
  confirmClose<EditorDrawerProps>()(
    ({
      defaultValue = [],
      onChange,
      visible,
      onClose,
      onDirty,
      loading,
      drawerProps = {},
      editorProps = {},
      editorId,
      className,
    }) => {
      const [value, setValue] = useState<Widgets>(defaultValue)
      return (
        <Drawer visible={visible} onClose={onClose} destroyOnClose {...drawerProps}>
          <div className={className}>
            <div className={'actions'}>
              <Button
                type={'primary'}
                onClick={() => {
                  onChange(value)
                  onClose()
                }}
                loading={loading}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </div>
            <div className={'editor'}>
              <Editor
                onChange={value => {
                  setValue(value)
                  onDirty()
                }}
                value={value}
                editorId={editorId}
                {...editorProps}
              />
            </div>
          </div>
        </Drawer>
      )
    },
  ),
)`
  > .actions {
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    button {
      margin-right: 10px;
    }
  }
`
