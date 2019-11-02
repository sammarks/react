import React, { FC } from 'react'
import styled, { StyledComponent } from 'styled-components'
import { EditorTheme } from './types'

interface InnerDragProps {
  size?: number
  color?: string
}
const InnerDrag = styled.span<InnerDragProps>`
  display: block;
  height: ${props => props.size! / 2}px;
  width: ${props => props.size!}px;
  border-top: solid 2px ${props => props.theme[props.color!]};
  border-bottom: solid 2px ${props => props.theme[props.color!]};
`
InnerDrag.defaultProps = {
  size: 15,
  color: '@gray-6',
}

export const Dragger: StyledComponent<
  FC<React.HTMLAttributes<HTMLDivElement> & InnerDragProps>,
  EditorTheme
> = styled(({ size, color, ...divProps }) => (
  <div {...divProps}>
    <InnerDrag size={size} color={color} />
  </div>
))`
  cursor: pointer;
  display: inline-block;
  padding: 5px;
`
