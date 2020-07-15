import React, { FC, ReactElement } from 'react'
import { EditorTheme, WidgetType } from './types'
import styled, { StyledComponent } from 'styled-components'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Button } from 'antd'
import isString from 'lodash/isString'

type IconRenderer = () => ReactElement
export interface AvailableType {
  icon: string | IconRenderer
  label: string
  type: WidgetType
}

export interface AvailableTypeSelectorProps {
  items: AvailableType[]
  onItemSelected: (type: WidgetType) => void
}

export const AvailableTypeSelector: StyledComponent<
  FC<AvailableTypeSelectorProps>,
  EditorTheme
> = styled(({ className, items, onItemSelected }) => (
  <div className={className}>
    {items.map((item: AvailableType) => (
      <Button key={item.type} onClick={() => onItemSelected(item.type)}>
        {isString(item.icon) ? <LegacyIcon type={item.icon} /> : item.icon()}
        <span>{item.label}</span>
      </Button>
    ))}
  </div>
))`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  > button {
    text-align: center;
    min-height: 120px;
    > i {
      display: block;
      font-size: 20px;
      margin: 0 0 10px 0;
    }
    > div {
      margin: 0 auto 5px auto;
    }
    > span {
      margin-left: 0 !important;
      max-width: 100%;
      white-space: normal;
      line-height: 1.1;
    }
    margin: 5px;
    min-width: 125px;
    width: 125px;
    height: 90px;
  }
`
