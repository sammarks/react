import React, { useContext } from 'react'
import orderBy from 'lodash/orderBy'
import { WidgetDraggable } from './WidgetDraggable'
import { EmptyList } from './EmptyList'
import { MoveTarget } from './MoveTarget'
import { Widget } from './Widget'
import { Widgets, Widget as WidgetType } from './types'
import { EditorContext } from './EditorContext'
import styled from 'styled-components'

export interface WidgetInnerListProps {
  widgets?: Widgets
  id?: string
  isMoveItemChild?: boolean
  onChange?: (widgets: Widgets) => void
}

const WidgetContainer = styled.div`
  img {
    max-width: 100%;
  }
`

export const WidgetInnerList: React.FC<WidgetInnerListProps> = ({
  widgets = [],
  id,
  isMoveItemChild,
  onChange,
}) => {
  const context = useContext(EditorContext)
  const _onDelete = (widget: WidgetType) => {
    if (onChange) {
      onChange(widgets.filter(propWidget => propWidget.id !== widget.id))
    }
  }
  const _widgetChange = (originalWidget: WidgetType, updates: Partial<WidgetType>) => {
    const widget = { ...originalWidget, ...updates }
    const widgetIndex = widgets.findIndex(propWidget => propWidget.id === widget.id)
    if (widgetIndex > -1 && onChange) {
      onChange([...widgets.slice(0, widgetIndex), widget, ...widgets.slice(widgetIndex + 1)])
    } else if (onChange) {
      onChange([...widgets, widget])
    }
  }
  let sortedWidgets = widgets
  if (sortedWidgets.length > 0) {
    sortedWidgets = orderBy(widgets, 'weight')
  }

  const _renderSortedWidgets = () => (
    <React.Fragment>
      {sortedWidgets.map(widget => (
        <WidgetDraggable
          widget={widget}
          key={widget.id}
          listId={id}
          onChange={_widgetChange.bind(null, widget)}
          onDelete={widget => {
            if (onChange) {
              onChange(widgets.filter(propWidget => propWidget.id !== widget.id))
            }
          }}
        />
      ))}
    </React.Fragment>
  )
  const _renderNormal = () => {
    if (sortedWidgets.length > 0) {
      return <WidgetContainer>{_renderSortedWidgets()}</WidgetContainer>
    } else {
      return <EmptyList />
    }
  }
  const _renderMoveMode = () => (
    <MoveTarget
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        if (id) {
          context.moveItem(id)
        } else {
          console.warn('Cannot move widget item as list ID was not provided.')
        }
      }}
      disabled={isMoveItemChild}
    >
      {_renderSortedWidgets()}
    </MoveTarget>
  )

  if (context.readOnly) {
    return (
      <WidgetContainer>
        {sortedWidgets.map(widget => (
          <Widget widget={widget} key={widget.id} />
        ))}
      </WidgetContainer>
    )
  } else if (context.movingWidgetId) {
    return _renderMoveMode()
  } else {
    return _renderNormal()
  }
}
