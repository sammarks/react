import React from 'react'
import { LayoutIcon } from './LayoutIcon'
import { LayoutWidget } from './LayoutWidget'
import { WidgetComponent, Widget, Widgets } from '../../types'
import { widgetDefaults } from '../widgetDefaults'
import { LayoutWidgetColumn } from './types'

const COLUMNS: LayoutWidgetColumn[] = [
  { columns: 12, name: 'leftWidgets', sm: 24, md: 6 },
  { columns: 12, name: 'rightWidgets', sm: 24, md: 18 },
]

export interface ThreeQuarterLeftWidget extends Widget {
  childGroups?: {
    leftWidgets?: Widgets
    rightWidgets?: Widgets
  }
}

export const ThreeQuarterLeft: WidgetComponent<ThreeQuarterLeftWidget> = props => (
  <LayoutWidget columns={COLUMNS} {...props} />
)
ThreeQuarterLeft.icon = () => <LayoutIcon columns={COLUMNS} />
ThreeQuarterLeft.defaults = {
  ...widgetDefaults,
  type: 'ThreeQuarterLeft',
  childGroups: {
    leftWidgets: [],
    rightWidgets: [],
  },
}
