import React, { FC, useContext } from 'react'
import { WidgetComponentProps } from './types'
import { EditorContext } from './EditorContext'

export type WidgetProps = WidgetComponentProps

export const Widget: FC<WidgetProps> = props => {
  const { widgetComponents } = useContext(EditorContext)
  if (widgetComponents[props.widget.type]) {
    const WidgetComponent = widgetComponents[props.widget.type]
    return <WidgetComponent {...props} />
  } else {
    throw new Error(`Widget type '${props.widget.type}' is invalid.`)
  }
}
