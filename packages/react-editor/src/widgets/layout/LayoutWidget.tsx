import React, { useContext } from 'react'
import { WidgetComponentProps, Widgets, Widget, WidgetConfig } from '../../types'
import { Row, Col, Form, InputNumber, Select } from 'antd'
import { WidgetList } from '../../WidgetList'
import { EditorContext } from '../../EditorContext'
import { LayoutWidgetColumn } from './types'
import { EditableWidget } from '../EditableWidget'
import isNil from 'lodash/isNil'

export interface LayoutWidget extends Widget {
  config: LayoutWidgetConfig
}

export interface LayoutWidgetConfig extends WidgetConfig {
  gutter?: number | null
  alignment?: 'top' | 'middle' | 'bottom'
}

export interface LayoutWidgetProps extends WidgetComponentProps<LayoutWidget> {
  columns: LayoutWidgetColumn[]
}

export const LayoutWidget: React.FC<LayoutWidgetProps> = ({
  onChange,
  registerAction,
  widget,
  columns,
}) => {
  const context = useContext(EditorContext)
  const onGroupChange = (groupName: string, changes: Widgets) => {
    if (onChange) {
      onChange({ childGroups: { ...(widget.childGroups || {}), [groupName]: changes } })
    }
  }
  const _renderContent = () => (
    <Row
      style={{ marginTop: '30px' }}
      gutter={widget.config && !isNil(widget.config.gutter) ? widget.config.gutter : 16}
      align={widget.config && widget.config.alignment ? widget.config.alignment : 'top'}
      type={'flex'}
    >
      {columns.map(column => (
        <Col key={column.name} {...column}>
          <WidgetList widgets={(widget.childGroups || {})[column.name] || []} />
        </Col>
      ))}
    </Row>
  )
  const _renderEdit = () => (
    <React.Fragment>
      <EditableWidget
        widget={widget}
        registerAction={registerAction}
        drawerProps={{ title: 'Edit Layout' }}
        onChange={onChange}
      >
        {getFieldDecorator => (
          <React.Fragment>
            <Form.Item label={'Gutter'} extra={'in pixels'}>
              {getFieldDecorator('config.gutter')(<InputNumber min={0} placeholder={'eg. 30'} />)}
            </Form.Item>
            <Form.Item label={'Vertical Alignment'}>
              {getFieldDecorator('config.alignment', {
                initialValue:
                  widget.config && widget.config.alignment ? widget.config.alignment : 'top',
              })(
                <Select>
                  <Select.Option value={'top'}>Top</Select.Option>
                  <Select.Option value={'middle'}>Middle</Select.Option>
                  <Select.Option value={'bottom'}>Bottom</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </React.Fragment>
        )}
      </EditableWidget>
      <Row
        gutter={widget.config && !isNil(widget.config.gutter) ? widget.config.gutter : 16}
        align={widget.config && widget.config.alignment ? widget.config.alignment : 'top'}
        type={'flex'}
      >
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
    </React.Fragment>
  )

  if (context.readOnly) {
    return _renderContent()
  } else {
    return _renderEdit()
  }
}
