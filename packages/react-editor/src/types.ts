import { FC, ReactElement } from 'react'

export type WidgetType =
  | 'ThreeQuarterLeft'
  | 'ThreeQuarterRight'
  | 'TwoColumn'
  | 'MarkdownContent'
  | string // For custom widget types.

export interface WidgetChildGroups {
  [group: string]: Widget[]
}

export type WidgetConfig = object

export interface Widget {
  type: WidgetType
  id: string
  config: WidgetConfig
  weight: number
  childGroups?: WidgetChildGroups
}

export type Widgets = Widget[]

export interface WidgetComponentProps<W extends Widget = Widget> {
  registerAction?: (element: ReactElement) => void
  readOnly?: boolean
  onChange?: (widget: Partial<W>) => void
  widget: W
  isMoveItemChild?: boolean
}

export interface WidgetComponent<W extends Widget = Widget> extends FC<WidgetComponentProps<W>> {
  icon?: string
  label?: string
  defaults: Partial<W>
}

export interface WidgetComponents {
  [widgetType: string]: WidgetComponent
}

export type EditorTheme = any
