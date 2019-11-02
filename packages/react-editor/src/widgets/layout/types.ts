import { ColProps } from 'antd/lib/col'

export interface LayoutWidgetColumn extends ColProps {
  name: string
  columns: number
}
