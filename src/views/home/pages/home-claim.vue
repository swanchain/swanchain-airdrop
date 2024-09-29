<template>
  <div class="claim-container-all mb-100" v-if="metaAddress">
    <template v-for="list in listData" :key="list">
      <div class="claim-container flex flex-jc-center mb-64">
        <div class="claim-container-card card p-32">
          <div class="font-32 font-text text-center mb-8 line-2">{{ list.title }}</div>
          <div class="font-20 text-center line-2 color-text">{{ list.subTitle }}</div>
          <el-divider />
          <template v-for="(d, dIndex) in list.data" :key="d.name">
            <div :class="`flex flex-ai-center flex-jc-between ${dIndex > 0 ? 'mt-24' : ''}`">
              <div class="font-20">{{ d.name }}</div>
              <div class="unit flex flex-ai-end">
                <div class="font-20 mr-4">{{ replaceFormat(d.token) }}</div>
                <div class="font-17 pb-4">Token</div>
              </div>
            </div>
          </template>
          <el-divider />
          <div class="font-16 text-right color-text">Total</div>
          <div class="unit flex flex-ai-end flex-jc-right mt-8">
            <div class="font-20 mr-4">{{ replaceFormat(list.total) }}</div>
            <div class="font-17 pb-4">Token</div>
          </div>
        </div>
      </div>
    </template>
    <div class="claim-container flex flex-jc-center mb-64">
      <div class="claim-container-card card p-32">
        <div class="font-28 font-text text-center color-text">Total</div>
        <div class="font-48 font-text flex flex-ai-center flex-jc-center mb-8">
          <span class="mr-16">{{ replaceFormat(totalAll) }}</span> Token
        </div>
        <el-divider class="m" />
        <div class="flex flex-jc-center">
          <div class="claim-btn font-32 font-text text-center uppercase pointer">Claim</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { metaAddress } from '@/utils/storage'
import { getAllTask } from '@/api/task';
import { replaceFormat } from '@/utils/common';

const listLoad = ref(false)
const listData = ref([
  {
    title: 'Mainnet',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    data: [
      {
        name: 'Moonlight (Meta GF)',
        token: 2000
      },
      {
        name: 'Meta Merge Pets - S',
        token: 2000
      },
      {
        name: 'BAC Genesis Runner',
        token: 2000
      },
      {
        name: 'Cyber8Ball Cue NFTs',
        token: 2000
      },
      {
        name: 'Cyber8Ball Cue NFTs',
        token: 2000
      },
      {
        name: 'Cyber8Ball Cue NFTs',
        token: 2000
      }
    ],
    total: 0
  },
  {
    title: 'Testnet',
    subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    data: [
      {
        name: 'Moonlight (Meta GF)',
        token: 2000
      },
      {
        name: 'Meta Merge Pets - S',
        token: 2000
      },
      {
        name: 'BAC Genesis Runner',
        token: 2000
      },
      {
        name: 'Cyber8Ball Cue NFTs',
        token: 2000
      },
      {
        name: 'Cyber8Ball Cue NFTs',
        token: 2000
      },
      {
        name: 'Cyber8Ball Cue NFTs',
        token: 2000
      }
    ],
    total: 0
  }
])
const totalAll = ref(0)

async function getAllData() {
  if (!metaAddress.value) return
  listLoad.value = true
  try { 
    // const taskRes = await getAllTask()
    const listRes = {
      data: listData.value
    }
    if (listRes?.data) listData.value = listRes.data.map((item: any) => {
      item.total = item.data.reduce((sum: any, item: any) => sum + item.token, 0)
      totalAll.value += item.total
      return {
        ...item
      }
    })
  } finally {
    listLoad.value = false
  }
}

onMounted(async () => {
  getAllData()
})

watch(() => metaAddress.value, () => getAllData())
</script>

<style scoped lang="less">
.claim-container {
  &-card {
    width: 41%;
    width: 778px;
    min-width: 420px;
    margin: auto;
    @media screen and (max-width: 992px) {
      width: 70%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
      min-width: 320px;
    }
    :deep(.el-divider) {
      margin: 0.24rem 0;
      border-color: var(--color-light-opacity-16);
      &.m {
        margin: 0 0 0.24rem;
      }
      .el-divider__text {
        left: 0;
        padding: 0.08rem;
        background-color: var(--color-dark-black);
        font-size: var(--font-12);
        font-weight: 600;
        color: var(--color-light);
      }
    }
    .claim-btn {
      min-width: 3rem;
      padding: 0.1rem 0.16rem;
      background: linear-gradient(160deg, #4DABF7, #38D9A9);
      border-radius: 0.08rem;
      transition: all 0.2s;
      &:hover {
        background: linear-gradient(-160deg, #4DABF7, #38D9A9);
      }
    }
  }
}
</style>
