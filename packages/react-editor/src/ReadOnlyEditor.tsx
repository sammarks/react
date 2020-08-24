import React, { useState } from 'react'
import { WidgetList } from './WidgetList'
import { DefaultEditorContext, EditorContext } from './EditorContext'
import FullScreen from 'react-full-screen'
import styled from 'styled-components'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Tooltip } from 'antd'
import classNames from 'classnames'
import { Widgets, WidgetComponents } from './types'
import { DefaultWidgets } from './widgets'

export interface ReadOnlyEditorProps {
  value: Widgets
  allowFullscreen?: boolean
  customWidgets?: WidgetComponents
}

export const ReadOnlyEditor = styled(
  ({
    value,
    allowFullscreen,
    className,
    customWidgets = {},
  }: ReadOnlyEditorProps & { className?: string }) => {
    const [fullscreen, setFullscreen] = useState(false)
    return (
      <FullScreen enabled={fullscreen} onChange={setFullscreen}>
        <div
          className={classNames({
            [className || '']: true,
            'fullscreen-enabled': fullscreen,
          })}
        >
          <div className={'content'}>
            {allowFullscreen && (
              <div className={'header'}>
                <Tooltip title={fullscreen ? 'Exit Fullscreen Mode' : 'View Fullscreen'}>
                  <LegacyIcon
                    type={fullscreen ? 'fullscreen-exit' : 'fullscreen'}
                    onClick={() => setFullscreen(!fullscreen)}
                  />
                </Tooltip>
              </div>
            )}
            <EditorContext.Provider
              value={{
                ...DefaultEditorContext,
                readOnly: true,
                widgetComponents: {
                  ...DefaultWidgets,
                  ...customWidgets,
                },
              }}
            >
              <WidgetList widgets={value} onChange={() => false} />
            </EditorContext.Provider>
          </div>
        </div>
      </FullScreen>
    )
  },
)`
  &.fullscreen-enabled > .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    overflow-y: auto;
    background: ${props => props.theme['@layout-body-background']};
  }
  .content > .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
    > span[role='img'] {
      font-size: 16px;
      color: ${props => props.theme['@gray-4']};
      transition: color 0.1s linear;
      cursor: pointer;
      &:hover {
        color: ${props => props.theme['@gray-7']};
      }
    }
  }
`
