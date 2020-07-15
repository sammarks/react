import React from 'react'
import { confirmClose } from '@sammarks/react-confirm-close'
import { Form } from '@ant-design/compatible'
import { Button, Drawer } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/lib/form'
import { DrawerProps } from 'antd/lib/drawer'
import { ConfirmCloseComponentProps } from '../../../../react-confirm-close/src/types'
import { WidgetComponentProps } from '../../types'

export interface EditableWidgetDrawerProps extends WidgetComponentProps {
  onClose: () => void
  formProps?: any
  visible?: boolean
  drawerProps?: Partial<DrawerProps>
  children: (
    getFieldDecorator: FormComponentProps['form']['getFieldDecorator'],
    renderSubmitFields: RenderSubmitFields,
  ) => React.ReactElement
}

type EditableWidgetDrawerInnerProps = EditableWidgetDrawerProps & FormComponentProps<object>

interface PreventDefaultEvent {
  preventDefault: () => void
}

interface RenderSubmitFields {
  (): React.ReactElement
}

const EditableWidgetDrawerInner: React.FC<EditableWidgetDrawerInnerProps> = ({
  onChange = () => null,
  formProps = {},
  onClose,
  visible,
  children,
  drawerProps = {},
  form,
}) => {
  const onSubmit = (e?: PreventDefaultEvent) => {
    if (e) {
      e.preventDefault()
    }
    form.validateFields((err, values) => {
      if (!err) {
        onChange(values)
        onClose()
      }
    })
  }
  const renderSubmitFields: RenderSubmitFields = () => (
    <Form.Item>
      <Button onClick={onClose} style={{ marginRight: '10px' }}>
        Cancel
      </Button>
      <Button type={'primary'} htmlType={'submit'} onClick={e => onSubmit(e)}>
        Save
      </Button>
    </Form.Item>
  )

  return (
    <Drawer
      title={'Edit Widget'}
      width={400}
      destroyOnClose
      {...drawerProps}
      onClose={onClose}
      visible={visible}
    >
      <Form onSubmit={onSubmit} layout={'vertical'} {...formProps}>
        {children(form.getFieldDecorator, renderSubmitFields)}
        {renderSubmitFields()}
      </Form>
    </Drawer>
  )
}

const _withConfirmClose = confirmClose<EditableWidgetDrawerInnerProps>()(EditableWidgetDrawerInner)
const _withForm = Form.create<ConfirmCloseComponentProps<EditableWidgetDrawerInnerProps>>({
  onValuesChange: props => {
    if (props.onDirty) {
      props.onDirty()
    }
  },
})(_withConfirmClose)

export const EditableWidgetDrawer = _withForm
