import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import uuid from 'uuid/v4'
import { EditableWidgetDrawer, EditableWidgetDrawerProps } from './EditableWidgetDrawer'
import { WidgetComponentProps } from '../../types'

export interface EditableWidgetProps
  extends WidgetComponentProps,
    Omit<EditableWidgetDrawerProps, 'onClose'> {
  visible?: boolean
  onClose?: () => void
}

export const EditableWidget: React.FC<EditableWidgetProps> = ({
  registerAction,
  visible,
  onClose,
  ...props
}) => {
  const [drawerKey, setDrawerKey] = useState<string | undefined>()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const _onEdit = () => setDrawerKey(uuid())
  useEffect(() => {
    if (registerAction) {
      registerAction(
        <Tooltip key={'edit'} title={'Edit'}>
          <a onClick={_onEdit}>
            <Icon type={'edit'} />
          </a>
        </Tooltip>,
      )
    }
  }, [registerAction])
  useEffect(() => {
    if (visible) {
      setDrawerKey(uuid())
    } else {
      setDrawerVisible(false)
    }
  }, [visible, setDrawerKey, setDrawerVisible])
  useEffect(() => {
    if (drawerKey) {
      setDrawerVisible(true)
    } else {
      setDrawerVisible(false)
    }
  }, [drawerKey, setDrawerVisible])

  return (
    <EditableWidgetDrawer
      {...props}
      onClose={() => {
        setDrawerVisible(false)
        if (onClose) onClose()
      }}
      key={drawerKey}
      visible={drawerVisible}
    />
  )
}
