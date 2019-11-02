import React from 'react'
import { WidgetComponents } from './types'

export interface IEditorContext {
  editorId: string
  movingWidgetId: string | null
  enableMoveMode: (itemId: string) => void
  moveItem: (targetListId: string) => void
  widgetComponents: WidgetComponents
  readOnly?: boolean
}

export const DefaultEditorContext: IEditorContext = {
  editorId: 'editor',
  movingWidgetId: null,
  enableMoveMode: itemId => false,
  moveItem: targetListId => false,
  widgetComponents: {},
  readOnly: false,
}

export const EditorContext = React.createContext<IEditorContext>(DefaultEditorContext)
