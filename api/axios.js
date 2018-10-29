import axios from 'axios'

export default axios.create({
  timeout: 120000,
  transformResponse: [function (data) {
    if (typeof data === 'string') {
      data = data.replace(/\+/g, '%20')
      try {
        data = JSON.parse(decodeURIComponent(data))
      } catch (e) {
        // donothing
      }
    }
    return data
  }]
})
