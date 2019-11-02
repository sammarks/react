import React, { FC, ReactElement, useState } from 'react'
import { EditorTheme, WidgetComponents, Widgets } from './types'
import { OnDragEndResponder, DragDropContext } from 'react-beautiful-dnd'
import { updateWidgetWeight } from './helpers/weights'
import { Button } from 'antd'
import styled, { StyledComponent } from 'styled-components'
import { EditorContext } from './EditorContext'
import { DefaultWidgets } from './widgets'

interface RegisterDropFunction {
  (dropFunctionId: string, dropFunction: OnDragEndResponder): void
}

export interface EditorProps {
  value?: Widgets
  customWidgets?: WidgetComponents
  editorId: string
  onChange: (value: Widgets) => void
  registerDropFunction?: RegisterDropFunction
}

export const Editor: StyledComponent<FC<EditorProps>, EditorTheme> = styled(
  ({ onChange, customWidgets = {}, value = [], editorId, className, registerDropFunction }) => {
    const [movingWidgetId, setMovingWidgetId] = useState<string | null>(null)
    const rootGroupId = `${editorId}-editor-root`
    const _onDragEnd: OnDragEndResponder = result => {
      if (result.destination && result.source) {
        const id = result.draggableId
        const parentId = result.destination.droppableId
        const weight = result.destination.index
        onChange(
          updateWidgetWeight(rootGroupId, value, id, {
            parentId,
            weight,
          }),
        )
      }
    }
    const _onMoveItem = (targetListId: string) => {
      if (!movingWidgetId) return
      onChange(
        updateWidgetWeight(rootGroupId, value, movingWidgetId, {
          parentId: targetListId,
          weight: 0,
        }),
      )
      setMovingWidgetId(null)
    }

    let cancelMove: ReactElement | null = null
    if (movingWidgetId) {
      cancelMove = (
        <Button className={'cancel-move'} icon={'close'} onClick={() => setMovingWidgetId(null)}>
          Cancel
        </Button>
      )
    }

    const content = (
      <EditorContext.Provider
        value={{
          editorId,
          movingWidgetId,
          enableMoveMode: itemId => setMovingWidgetId(itemId),
          moveItem: _onMoveItem,
          widgetComponents: {
            ...DefaultWidgets,
            ...customWidgets,
          },
        }}
      >
        <div className={className}>{cancelMove}</div>
      </EditorContext.Provider>
    )

    if (registerDropFunction) {
      return content
    } else {
      return <DragDropContext onDragEnd={_onDragEnd}>{content}</DragDropContext>
    }
  },
)`
  position: relative;
  > .cancel-move {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`
