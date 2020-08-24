import React from 'react'
import { WidgetComponents, WidgetType } from './types'

export interface EditorCopy {
  addWidget: string
  noContentMessage: string
}

export interface IEditorContext {
  editorId: string
  movingWidgetId: string | null
  enableMoveMode: (itemId: string) => void
  moveItem: (targetListId: string) => void
  widgetComponents: WidgetComponents
  readOnly?: boolean
  addTypes?: WidgetType[]
  copy: EditorCopy
}

export const DEFAULT_COPY: EditorCopy = {
  addWidget: 'Add Widget',
  noContentMessage: 'No content yet!',
}

export const DefaultEditorContext: IEditorContext = {
  editorId: 'editor',
  movingWidgetId: null,
  enableMoveMode: itemId => false,
  moveItem: targetListId => false,
  widgetComponents: {},
  readOnly: false,
  copy: DEFAULT_COPY,
}

export const EditorContext = React.createContext<IEditorContext>(DefaultEditorContext)
