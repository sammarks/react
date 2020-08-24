import React, { FC, useContext, useState } from 'react'
import { WidgetType } from './types'
import Case from 'case'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Button, Modal } from 'antd'
import { EditorContext } from './EditorContext'
import { AvailableType, AvailableTypeSelector } from './AvailableTypeSelector'

interface AddWidgetButtonProps {
  availableTypes: WidgetType[]
  onAdd: (widgetType: WidgetType) => void
}

export const AddWidgetButton: FC<AddWidgetButtonProps> = ({ availableTypes, onAdd }) => {
  const context = useContext(EditorContext)
  const [multipleVisible, setMultipleVisible] = useState(false)
  if (availableTypes.length === 1) {
    return (
      <Button
        onClick={() => onAdd(availableTypes[0])}
        icon={<LegacyIcon type={'plus'} />}
        style={{ margin: '16px auto', display: 'block' }}
      >
        Add {Case.title(availableTypes[0])}
      </Button>
    )
  } else {
    const items: AvailableType[] = availableTypes.map((availableType: WidgetType) => {
      const widgetComponent = context.widgetComponents[availableType]
      return {
        icon: widgetComponent.icon || 'plus',
        label: widgetComponent.label || Case.title(availableType),
        type: availableType,
      }
    })
    return (
      <React.Fragment>
        <Button
          onClick={() => setMultipleVisible(true)}
          icon={<LegacyIcon type={'plus'} />}
          style={{ margin: '16px auto', display: 'block' }}
        >
          {context.copy.addWidget}
        </Button>
        <Modal
          title={context.copy.addWidget}
          onCancel={() => setMultipleVisible(false)}
          visible={multipleVisible}
          footer={[
            <Button key={'cancel'} onClick={() => setMultipleVisible(false)}>
              Cancel
            </Button>,
          ]}
        >
          <AvailableTypeSelector
            onItemSelected={item => {
              onAdd(item)
              setMultipleVisible(false)
            }}
            items={items}
          />
        </Modal>
      </React.Fragment>
    )
  }
}
