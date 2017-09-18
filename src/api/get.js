import axios from 'axios'

// axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// const base = 'http://rapapi.org/mockjsdata/24465/api'
const base = '/api/'

// get获取信息
export function getInfo (info) {
  const url = base + info
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
