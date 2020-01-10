import request from '@/utils/request'
export const getChannels = () => request({
  url: '/app/v1_0/user/channels'
})
export const artList = params => request({
  url: '/app/v1_1/articles',
  params
})
