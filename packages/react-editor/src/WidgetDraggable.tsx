import React, { useState, useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Widget } from './Widget'
import styled, { StyledComponent } from 'styled-components'
import classNames from 'classnames'
import { Tooltip, Icon, Popconfirm } from 'antd'
import { Dragger } from './Dragger'
import { WidgetComponentProps, EditorTheme, Widget as WidgetType } from './types'
import { EditorContext } from './EditorContext'

interface WidgetDraggableProps extends WidgetComponentProps {
  listId?: string
  onDelete: (widget: WidgetType) => void
}

export const WidgetDraggable: StyledComponent<React.FC<WidgetDraggableProps>, EditorTheme> = styled(
  ({ listId, onDelete, widget, className, ...widgetProps }) => {
    const [actionsHovering, setActionsHovering] = useState(false)
    const [additionalActions, setAdditionalActions] = useState<React.ReactElement[]>([])
    const context = useContext(EditorContext)

    const _renderActions = () => (
      <React.Fragment>
        {additionalActions}
        <Tooltip title={'Move'}>
          <a
            onClick={() => {
              context.enableMoveMode(widget.id)
            }}
          >
            <Icon type={'arrow-right'} />
          </a>
        </Tooltip>
        <Tooltip title={'Delete'}>
          <Popconfirm
            title={'Are you sure?'}
            onConfirm={() => onDelete(widget)}
            okType={'danger'}
            okText={'Yes, delete'}
          >
            <a>
              <Icon type={'delete'} className={'delete-icon'} />
            </a>
          </Popconfirm>
        </Tooltip>
      </React.Fragment>
    )
    const _renderWidget = () => (
      <Widget
        widget={widget}
        {...widgetProps}
        registerAction={action => {
          setAdditionalActions([...additionalActions, action])
        }}
      />
    )
    const _renderNormal = () => (
      <Draggable draggableId={widget.id} index={widget.weight} type={listId}>
        {provided => (
          <div
            ref={provided.innerRef}
            className={classNames({
              [className]: true,
              'actions-hover': actionsHovering,
            })}
            {...provided.draggableProps}
          >
            <div className={'content'}>{_renderWidget()}</div>
            <div
              className={'top-actions'}
              onMouseEnter={() => setActionsHovering(true)}
              onMouseLeave={() => setActionsHovering(false)}
            >
              <Dragger {...provided.dragHandleProps} className={'dragger'} />
              {_renderActions()}
            </div>
          </div>
        )}
      </Draggable>
    )

    if (context.movingWidgetId) {
      return _renderWidget()
    } else {
      return _renderNormal()
    }
  },
)`
  background: transparent;
  transition: background 0.1s linear, border 0.1s linear;
  position: relative;
  border: solid 2px transparent;
  .top-actions {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    opacity: 0.1;
    transition: opacity 0.1s linear;
    padding: 3px 5px;
    margin: 0 0 10px 0;
    border-radius: 1px;
    background: ${props => props.theme['@gray-1']};
    .dragger {
      margin-right: 5px;
      display: inline-block;
      vertical-align: middle;
    }
    i {
      font-size: 16px;
      margin: 2px 5px 0 0;
    }
    a {
      color: ${props => props.theme['@gray-7']};
      line-height: 1;
      &:hover i.delete-icon {
        color: ${props => props.theme['@red']};
      }
    }
  }
  .content {
    padding: 30px 5px 5px 5px;
  }
  &.actions-hover {
    border-color: ${props => props.theme['@blue']};
  }
  &:hover {
    background: ${props => props.theme['@gray-1']};
    > .top-actions {
      opacity: 1;
    }
  }
`