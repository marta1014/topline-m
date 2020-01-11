import request from '@/utils/request'
export const getAllChannels = () => request({
  url: '/app/v1_0/channels'
})
