import React, { ReactElement, useState, useEffect, useMemo, useCallback } from 'react'
import { WidgetComponents, Widgets, WidgetType } from './types'
import { OnDragEndResponder, DragDropContext } from 'react-beautiful-dnd'
import { updateWidgetWeight } from './helpers/weights'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Button } from 'antd'
import styled from 'styled-components'
import { DEFAULT_COPY, EditorContext, EditorCopy } from './EditorContext'
import { DefaultWidgets } from './widgets'
import { WidgetList } from './WidgetList'

interface RegisterDropFunction {
  (dropFunctionId: string, dropFunction: OnDragEndResponder): void
}

export interface EditorProps {
  value?: Widgets
  customWidgets?: WidgetComponents
  editorId: string
  onChange?: (value: Widgets) => void
  registerDropFunction?: RegisterDropFunction
  addTypes?: WidgetType[]
  copy?: Partial<EditorCopy>
}

export const Editor = styled(
  ({
    onChange,
    customWidgets = {},
    addTypes = [],
    value = [],
    editorId,
    className,
    registerDropFunction,
    copy,
  }: EditorProps & { className?: string }) => {
    const [movingWidgetId, setMovingWidgetId] = useState<string | null>(null)
    const rootGroupId = useMemo(() => `${editorId}-editor-root`, [editorId])
    const _onDragEnd: OnDragEndResponder = useCallback(
      result => {
        if (result.destination && result.source) {
          const id = result.draggableId
          let parentId = result.destination.droppableId
          try {
            const parsed = JSON.parse(result.destination.droppableId)
            if (parsed.droppableId) parentId = parsed.droppableId
          } catch (err) {
            // Do nothing on purpose...
          }
          const weight = result.destination.index
          if (onChange) {
            onChange(
              updateWidgetWeight(rootGroupId, value, id, {
                parentId,
                weight,
              }),
            )
          }
        }
      },
      [value, rootGroupId],
    )
    const _onMoveItem = (targetListId: string) => {
      if (!movingWidgetId) return
      if (onChange) {
        onChange(
          updateWidgetWeight(rootGroupId, value, movingWidgetId, {
            parentId: targetListId,
            weight: 0,
          }),
        )
      }
      setMovingWidgetId(null)
    }
    useEffect(() => {
      if (registerDropFunction) {
        registerDropFunction(`editor-${editorId}`, _onDragEnd)
      }
    }, [registerDropFunction, _onDragEnd])

    let cancelMove: ReactElement | null = null
    if (movingWidgetId) {
      cancelMove = (
        <Button
          className={'cancel-move'}
          icon={<LegacyIcon type={'close'} />}
          onClick={() => setMovingWidgetId(null)}
        >
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
          copy: {
            ...DEFAULT_COPY,
            ...copy,
          },
          addTypes,
        }}
      >
        <div className={className}>{cancelMove}</div>
        <WidgetList onChange={onChange} widgets={value} id={rootGroupId} />
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
