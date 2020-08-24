import React, { useContext } from 'react'
import { Empty } from 'antd'
import styled from 'styled-components'
import { EditorContext } from './EditorContext'

export const EmptyList = styled(({ className }) => {
  const context = useContext(EditorContext)
  return (
    <div className={className}>
      <Empty description={context.copy.noContentMessage} />
    </div>
  )
})`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
