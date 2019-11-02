import React from 'react'
import { Empty } from 'antd'
import styled from 'styled-components'

export const EmptyList = styled(({ className }) => (
  <div className={className}>
    <Empty description={'No content yet!'} />
  </div>
))`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
