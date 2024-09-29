import type { IOption } from 'types/common'

export const activeMenuPath = ref('')

export const menus = ref<IOption[]>([
  {
    label: 'Network',
    value: '',
    // value: '/product',
    children: [
      { label: 'Network', value: '' },
      //   { label: 'Blockchain Cloud', value: '/product/blockchain-cloud' },
      //   { label: 'CPU Cloud', value: '/product/cpu-cloud' }
    ]
  },
  {
    label: 'Market Provider',
    value: '',
    // value: '/company',
    children: [
      { label: 'Market Provider', value: '' },
      //   { label: 'Career', value: '/company/career' },
      //   { label: 'Blog', value: '/company/blog' }
    ]
  },
  { label: 'APPS', value: '' },
  { label: 'Bridge', value: '' },
  { label: 'Developer', value: '', children: [{ label: 'Developer', value: '' }] },
  { label: 'Community', value: '', children: [{ label: 'Community', value: '' }] },
  { label: 'Governance', value: '' },
  { label: 'Testnet', value: '', children: [{ label: 'Testnet', value: '' }] },
])
