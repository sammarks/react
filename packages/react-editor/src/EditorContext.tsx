import React from 'react'
import { WidgetComponents, WidgetType, Widget } from './types'

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

export interface EditorValueContextValue {
  widgets: Widget[]
}

export const EditorContext = React.createContext<IEditorContext>(DefaultEditorContext)
export const EditorValueContext = React.createContext<EditorValueContextValue | undefined>(
  undefined,
)

export function useEditorValueContext(require?: false): EditorValueContextValue | undefined
export function useEditorValueContext(require: true): EditorValueContextValue
export function useEditorValueContext(require?: boolean): EditorValueContextValue | undefined {
  const context = React.useContext(EditorValueContext)
  if (!context && require) {
    throw new Error('EditorValueContext is required, yet not provided.')
  }
  return context
}
