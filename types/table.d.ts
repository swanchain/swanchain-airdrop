import { EPos, EPosition } from '@/constant/common'

export interface IColumn {
  prop: string
  label: string | string[]
  width?: string
  align?: EPosition
  fixed?: EPos
}

export interface ISpan {
  rowIndex: number
  colIndex: number
  rowspan: number
  colspan: number
}

export interface ISpanMethodProps<T = any> {
  row: T
  column: IColumn
  rowIndex: number
  columnIndex: number
}
