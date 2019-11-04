import React, { FC, useContext, useState } from 'react'
import { EditorTheme, WidgetType } from './types'
import styled, { StyledComponent } from 'styled-components'
import Case from 'case'
import { Button, Icon, Modal } from 'antd'
import { EditorContext } from './EditorContext'
import { AvailableType, AvailableTypeSelector } from './AvailableTypeSelector'

interface AddWidgetButtonProps {
  availableTypes: WidgetType[]
  onAdd: (widgetType: WidgetType) => void
}

export const AddWidgetButton: StyledComponent<FC<AddWidgetButtonProps>, EditorTheme> = styled(
  ({ availableTypes, onAdd, className }) => {
    const context = useContext(EditorContext)
    const [multipleVisible, setMultipleVisible] = useState(false)
    if (availableTypes.length === 1) {
      return (
        <a onClick={() => onAdd(availableTypes[0])}>
          <div className={className}>
            <Icon type={'plus'} />
            <span>{` Add ${Case.title(availableTypes[0])}`}</span>
          </div>
        </a>
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
          <a onClick={() => setMultipleVisible(true)}>
            <div className={className}>
              <Icon type={'plus'} />
              <span>&nbsp;Add Widget</span>
            </div>
          </a>
          <Modal
            title={'Add Widget'}
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
  },
)`
  text-align: center;
  padding: 5px;
  margin: 10px 0 0 0;
  display: block;
  &:not(:hover) {
    color: ${props => props.theme['@gray-6']};
  }
`
