import React, { useContext } from 'react'
import { WidgetComponentProps, Widgets } from '../../types'
import { Row, Col } from 'antd'
import { WidgetList } from '../../WidgetList'
import { EditorContext } from '../../EditorContext'
import { LayoutWidgetColumn } from './types'

export interface LayoutWidgetProps extends WidgetComponentProps {
  columns: LayoutWidgetColumn[]
}

export const LayoutWidget: React.FC<LayoutWidgetProps> = ({ onChange, widget, columns }) => {
  const context = useContext(EditorContext)
  const onGroupChange = (groupName: string, changes: Widgets) => {
    if (onChange) {
      onChange({ childGroups: { ...(widget.childGroups || {}), [groupName]: changes } })
    }
  }
  const _renderContent = () => (
    <Row style={{ margin: '30px 0' }}>
      {columns.map(column => (
        <Col key={column.name} {...column}>
          <WidgetList widgets={(widget.childGroups || {})[column.name] || []} />
        </Col>
      ))}
    </Row>
  )
  const _renderEdit = () => (
    <Row>
      {columns.map(column => (
        <Col key={column.name} {...column}>
          <WidgetList
            id={`${widget.id}-${column.name}`}
            onChange={changes => onGroupChange(column.name, changes)}
            widgets={(widget.childGroups || {})[column.name] || []}
            isMoveItemChild={widget.id === context.movingWidgetId}
          />
        </Col>
      ))}
    </Row>
  )

  if (context.readOnly) {
    return _renderContent()
  } else {
    return _renderEdit()
  }
}
