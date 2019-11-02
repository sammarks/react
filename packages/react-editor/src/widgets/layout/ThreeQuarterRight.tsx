import React from 'react'
import { LayoutIcon } from './LayoutIcon'
import { LayoutWidget } from './LayoutWidget'
import { WidgetComponent, Widget, Widgets } from '../../types'
import { widgetDefaults } from '../widgetDefaults'
import { LayoutWidgetColumn } from './types'

const COLUMNS: LayoutWidgetColumn[] = [
  { columns: 12, name: 'leftWidgets', sm: 24, md: 18 },
  { columns: 12, name: 'rightWidgets', sm: 24, md: 6 },
]

export interface ThreeQuarterRightWidget extends Widget {
  childGroups?: {
    leftWidgets?: Widgets
    rightWidgets?: Widgets
  }
}

export const ThreeQuarterRight: WidgetComponent<ThreeQuarterRightWidget> = props => (
  <LayoutWidget columns={COLUMNS} {...props} />
)
ThreeQuarterRight.icon = () => <LayoutIcon columns={COLUMNS} />
ThreeQuarterRight.defaults = {
  ...widgetDefaults,
  type: 'ThreeQuarterRight',
  childGroups: {
    leftWidgets: [],
    rightWidgets: [],
  },
}
