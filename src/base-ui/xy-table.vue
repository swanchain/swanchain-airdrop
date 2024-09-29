<template>
  <div class="xy-table" :style="{ borderRadius: radius, borderColor }">
    <el-table :data="tableData" class="w-100" table-layout="fixed" :row-class-name="tableRowClassName" :row-style="tableRowStyle" :border="border" :header-cell-class-name="headerCellClassName" :header-cell-style="headerStyle" :cell-class-name="tableCellClassName"
      :cell-style="tableCellStyle" :span-method="spanMethod" :show-header="showHeader">
      <template v-for="col in columns" :key="col.label">
        <!-- :label="col.label" -->
        <el-table-column :prop="col.prop" :min-width="col.width" :align="col.align ?? EPosition.CENTER">
          <template #header>
            <div>{{ col.label }}</div>
          </template>
          <template #default="scope">
            <slot v-if="col.prop" :name="col.prop" :row="scope.row">
              <template v-if="Array.isArray(scope.row[col.prop])">
                <div v-for="(item, index) in scope.row[col.prop]" :key="index">{{ item }}</div>
              </template>
              <div v-else>{{ scope.row[col.prop] }}</div>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { EPosition } from '@/constant/common'
import type { IColumn, ISpan, ISpanMethodProps } from 'types/table'

const props = defineProps<{
  data: any[]
  columns: IColumn[]
  showHeader?: boolean
  border?: boolean
  borderColor?: string
  radius?: string
  headerBgColor?: string
  headerColor?: string
  headerHeight?: string
  headerCellClassName?: string
  cellClassName?: string
  cellHeight?: string
  cellColor?: string
  cellSpan?: ISpan[]
  stripeType?: 'primary' | 'success' | 'warning' | 'danger'
}>()

const tableData = computed(() => {
  if (props.showHeader) {
    return props.data
  }
  const row: any = {}
  props.columns.forEach((item) => {
    row[item.prop] = item.label
  })
  return [row, ...props.data]
})

function tableRowClassName(e: any) {
  if (e.rowIndex === 0) {
    return props.headerCellClassName
  }
  if (e.rowIndex % 2) {
    return ''
  }
  return props.stripeType ?? ''
}

const headerStyle = computed(() => {
  return {
    background: props.headerBgColor,
    color: props.headerColor,
    borderColor: props.borderColor,
    height: props.headerHeight
  }
})
function tableRowStyle(e: any) {
  if (e.rowIndex === 0) {
    return headerStyle.value
  }
  return ''
}
function tableCellStyle(e: any) {
  if (e.rowIndex === 0) {
    return headerStyle.value
  }
  return {
    color: props.cellColor,
    borderColor: props.borderColor,
    height: props.cellHeight
  }
}
function tableCellClassName(e: any) {
  if (e.rowIndex === 0) {
    return props.headerCellClassName
  }
  return props.cellClassName
}

function spanMethod({ rowIndex, columnIndex }: ISpanMethodProps) {
  const span = props.cellSpan?.find(
    (item) => item.rowIndex === rowIndex && item.colIndex === columnIndex
  )
  return { rowspan: span?.rowspan ?? 1, colspan: span?.colspan ?? 1 }
}
</script>

<style scoped lang="less">
.xy-table {
  overflow: hidden;
  border: 0.01rem solid transparent;
}
:deep(.primary) {
  --el-table-tr-bg-color: var(--color-primary-light);
}
</style>
