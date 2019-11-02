import React from 'react'
import { LayoutIcon } from './LayoutIcon'
import { LayoutWidget } from './LayoutWidget'
import { WidgetComponent, Widget, Widgets } from '../../types'
import { widgetDefaults } from '../widgetDefaults'
import { LayoutWidgetColumn } from './types'

const COLUMNS: LayoutWidgetColumn[] = [
  { columns: 12, name: 'leftWidgets', sm: 24, md: 12 },
  { columns: 12, name: 'rightWidgets', sm: 24, md: 12 },
]

export interface TwoColumnWidget extends Widget {
  childGroups?: {
    leftWidgets?: Widgets
    rightWidgets?: Widgets
  }
}

export const TwoColumn: WidgetComponent<TwoColumnWidget> = props => (
  <LayoutWidget columns={COLUMNS} {...props} />
)
TwoColumn.icon = () => <LayoutIcon columns={COLUMNS} />
TwoColumn.defaults = {
  ...widgetDefaults,
  type: 'TwoColumn',
  childGroups: {
    leftWidgets: [],
    rightWidgets: [],
  },
}
