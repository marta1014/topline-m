import request from '@/utils/request'
export const getProposal = q => request({// 建议
  url: '/app/v1_0/suggestion',
  params: { q }
})
export const getRes = params => request({// 搜索结果
  url: '/app/v1_0/search',
  params
})
