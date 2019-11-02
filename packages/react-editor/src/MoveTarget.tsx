import React, { useState } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { Icon } from 'antd'
import classNames from 'classnames'
import { EditorTheme } from './types'

export interface MoveTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export const MoveTarget: StyledComponent<React.FC<MoveTargetProps>, EditorTheme> = styled(
  ({ disabled, className, onClick, children, ...otherProps }) => {
    const [hovering, setHovering] = useState(false)
    return (
      <div
        {...otherProps}
        className={classNames({
          [className]: true,
          disabled,
          hovering,
        })}
      >
        <div
          className={'icon'}
          onClick={disabled ? undefined : onClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <Icon type={'fullscreen-exit'} style={{ fontSize: 20 }} />
          <span>Move Here</span>
        </div>
        <div className={'children'}>{children}</div>
      </div>
    )
  },
)`
  display: flex;
  background: rgba(0, 0, 0, 0.03);
  transition: background 0.1s linear, color 0.1s linear;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  margin: 10px 0;
  color: ${props => props.theme['@gray-4']};
  &:not(.disabled).hovering {
    background: rgba(0, 0, 0, 0.06);
    color: ${props => props.theme['@gray-6']};
  }
  &.disabled {
    min-height: 50px;
    > .icon {
      cursor: default;
      display: none;
    }
  }
  > .icon {
    cursor: pointer;
    margin: 10px auto;
    text-align: center;
    span {
      display: block;
    }
  }
  > .children {
    display: block;
    width: 100%;
  }
`
