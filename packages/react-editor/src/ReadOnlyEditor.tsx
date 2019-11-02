import React, { useState } from 'react'
import { WidgetList } from './WidgetList'
import { DefaultEditorContext, EditorContext } from './EditorContext'
import FullScreen from 'react-full-screen'
import styled, { StyledComponent } from 'styled-components'
import { Icon, Tooltip } from 'antd'
import classNames from 'classnames'
import { EditorTheme, Widgets } from './types'

interface ReadOnlyEditorProps {
  value: Widgets
  allowFullscreen?: boolean
}

export const ReadOnlyEditor: StyledComponent<React.FC<ReadOnlyEditorProps>, EditorTheme> = styled(
  ({ value, allowFullscreen, className }) => {
    const [fullscreen, setFullscreen] = useState(false)
    return (
      <FullScreen enabled={fullscreen} onChange={setFullscreen}>
        <div
          className={classNames({
            [className]: true,
            'fullscreen-enabled': fullscreen,
          })}
        >
          <div className={'content'}>
            {allowFullscreen && (
              <div className={'header'}>
                <Tooltip title={fullscreen ? 'Exit Fullscreen Mode' : 'View Fullscreen'}>
                  <Icon
                    type={fullscreen ? 'fullscreen-exit' : 'fullscreen'}
                    onClick={() => setFullscreen(!fullscreen)}
                  />
                </Tooltip>
              </div>
            )}
            <EditorContext.Provider value={{ ...DefaultEditorContext, readOnly: true }}>
              <WidgetList widgets={value} onChange={() => false} />
            </EditorContext.Provider>
          </div>
        </div>
      </FullScreen>
    )
  },
)``