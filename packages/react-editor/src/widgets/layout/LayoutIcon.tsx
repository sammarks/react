import React from 'react'
import styled from 'styled-components'
import { LayoutWidgetColumn } from './types'

export interface LayoutIconProps {
  columns: LayoutWidgetColumn[]
}

export const LayoutIcon = styled(
  ({ columns, className, style }: LayoutIconProps & { className?: string; style?: any }) => (
    <div
      className={className}
      style={{
        width: '20px',
        height: '20px',
        ...style,
      }}
    >
      {columns.map((column: LayoutWidgetColumn) => (
        <div key={column.name} style={{ width: `${(column.columns / 24) * 100}%` }}>
          <span className={'inner'} />
        </div>
      ))}
    </div>
  ),
)`
  display: flex;
  > div {
    box-sizing: border-box;
    padding: 1px;
    display: flex;
  }
  span {
    display: block;
    flex-grow: 1;
    background: ${props => props.theme['@gray-6']};
  }
`
