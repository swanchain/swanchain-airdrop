<template>
  <el-upload v-model:file-list="fileList" ref="upload" class="upload" action="" :limit="limit" :on-exceed="handleExceed" :on-change="handleChange" :auto-upload="false" :show-file-list="!!value">
    <template #trigger>
      <div class="btn font-16 font-bold p-8">{{ label }}</div>
    </template>
    <template #tip>
      <div v-if="tips" class="el-upload__tip color-info">{{ tips }}</div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const props = withDefaults(
  defineProps<{
    value: any
    limit?: number
    label?: string
    tips?: string
  }>(),
  {
    limit: 1,
    label: 'Choose File',
    tips: ''
  }
)

const emits = defineEmits(['update:value', 'change'])

const fileList = ref(props.value ? [props.value] : [])

const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

function handleChange(e: any) {
  console.log('e:',e)
  emits('update:value', e.raw)
  emits('change', e)
}

// function submitUpload() {
//   upload.value!.submit()
// }

// defineExpose({ upload: submitUpload })
</script>

<style lang="less" scoped>
.upload {
  width: 100%;
  padding: 0.12rem 0.16rem;
  background-color: var(--color-bg-input);
  border-radius: 0.16rem;
}
.btn {
  color: var(--color-info);
  border-color: var(--color-info);
  border-radius: 0.08rem;
}
.btn:hover {
  background-color: var(--color-primary);
  color: var(--color-light);
  border-color: var(--color-primary);
}
@media screen and (max-width: 768px) {
  .upload {
    padding: 10px 11px;
  }
}
</style>
