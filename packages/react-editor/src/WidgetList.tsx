import React, { FC, useContext } from 'react'
import classnames from 'classnames'
import max from 'lodash/max'
import cloneDeep from 'lodash/cloneDeep'
import uuid from 'uuid/v4'
import { Widget, Widgets, WidgetType } from './types'
import { EditorContext } from './EditorContext'
import { Droppable } from 'react-beautiful-dnd'
import { WidgetInnerList } from './WidgetInnerList'
import { AddWidgetButton } from './AddWidgetButton'

interface WidgetListProps {
  widgets: Widgets
  id?: string
  onChange?: (widgets: Widgets) => void
  isMoveItemChild?: boolean
  className?: string
}

export const WidgetList: FC<WidgetListProps> = props => {
  const { widgets, id, onChange, className } = props
  const context = useContext(EditorContext)
  const addTypes = context.addTypes || []
  const availableTypes =
    addTypes && addTypes.length ? addTypes : Object.keys(context.widgetComponents)

  const innerChild = <WidgetInnerList {...props} />
  let content = innerChild
  if (!context.readOnly) {
    content = (
      <React.Fragment>
        <div>
          <Droppable
            droppableId={JSON.stringify({
              droppableId: id,
              handler: `editor-${context.editorId}`,
            })}
            type={id}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={classnames({
                  'is-dragging': snapshot.isDraggingOver,
                })}
                {...provided.droppableProps}
              >
                {innerChild}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        {!context.movingWidgetId && (
          <AddWidgetButton
            availableTypes={availableTypes}
            onAdd={widgetType => {
              if (onChange) {
                const maximumWeight = max(widgets.map(widget => widget.weight)) || 0
                const newWidget = cloneDeep(context.widgetComponents[widgetType].defaults)
                newWidget.weight = maximumWeight + 1
                newWidget.id = uuid()
                onChange([...widgets, newWidget as Widget])
              }
            }}
          />
        )}
      </React.Fragment>
    )
  }

  return <div className={className} children={content} />
}
