<template>
  <div id="wrapper">
    <a href="http://www.waifcat.cn/"><img src="~/static/img/404_icon.png" class="fade"></a>
    <div>
      <h1 class="fade">唉呀!</h1>
      <p class="fade">你正在寻找的页面无法找到。<a style="color:#ff6600;" href="http://www.waifcat.cn/">可能在这里！</a></p>
      <a class="link" href="http://www.waifcat.cn/" onclick="history.go(-1)" style="opacity: 1;"><span id="sec">{{time}}</span> 秒后返回首页</a>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  props:['error'],
  data () {
    return {
      time: 2
    }
  },
  mounted () {
    setInterval(() => {
      time--
      if (time === 0) {
        window.location.href = 'http://www.waifcat.cn/'
      }
    }, 1000)
  }
}
</script>