import React, { useContext, useEffect, useState } from 'react'
import { Widget, WidgetComponent, WidgetConfig } from '../../types'
import { widgetDefaults } from '../widgetDefaults'
import uuid from 'uuid/v4'
import { Icon, Tooltip } from 'antd'
import Markdown from 'react-markdown'
import { EditorContext } from '../../EditorContext'
import { MarkdownModal } from './MarkdownModal'

export interface MarkdownContentWidget extends Widget {
  config: MarkdownContentWidgetConfig
}

export interface MarkdownContentWidgetConfig extends WidgetConfig {
  content?: string
}

export const MarkdownContent: WidgetComponent<MarkdownContentWidget> = ({
  onChange,
  registerAction,
  widget,
}) => {
  const [modalKey, setModalKey] = useState<string | undefined>()
  const editorContext = useContext(EditorContext)
  const onEditContent = () => {
    setModalKey(uuid())
  }
  useEffect(() => {
    if (registerAction) {
      registerAction(
        <Tooltip key={'edit'} title={'Edit'}>
          <a onClick={onEditContent}>
            <Icon type={'edit'} />
          </a>
        </Tooltip>,
      )
    }
  }, [registerAction])
  if (editorContext.readOnly) {
    return <Markdown source={widget.config.content} />
  } else {
    if (!editorContext.movingWidgetId) {
      return (
        <React.Fragment>
          <Markdown source={widget.config.content} />
          <MarkdownModal
            onChange={content => {
              if (onChange) {
                onChange({
                  config: {
                    ...widget.config,
                    content,
                  },
                })
              }
            }}
            onClose={() => setModalKey(undefined)}
            visible={!!modalKey}
            key={modalKey}
            defaultValue={widget.config.content}
          />
        </React.Fragment>
      )
    } else {
      return null
    }
  }
}

MarkdownContent.icon = 'copy'
MarkdownContent.defaults = {
  ...widgetDefaults,
  type: 'MarkdownContent',
  config: {
    content: 'Add some **content!**',
  },
}
