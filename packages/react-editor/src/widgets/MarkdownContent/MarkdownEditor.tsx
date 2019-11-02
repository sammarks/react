import React from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input'

export interface MarkdownEditorProps extends Omit<TextAreaProps, 'onChange'> {
  onChange: (value: string | undefined) => void
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = props => (
  <Input.TextArea
    rows={10}
    autosize={{ minRows: 6, maxRows: 30 }}
    {...props}
    onChange={e => {
      props.onChange(e.target.value)
    }}
  />
)
