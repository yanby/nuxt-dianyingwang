<template>
  <div id="wrapper">
    <a href="http://www.dfdy5.com/"><img src="~/static/img/404_icon.png"></a>
    <div>
      <h1>唉呀!</h1>
      <p>你正在寻找的页面无法找到。<a style="color:#ff6600;" href="/">可能在这里！</a></p>
      <a class="link" href="/" onclick="history.go(-1)"><span id="sec">{{time}}</span> {{time > 0 ? '秒后' : ''}}返回首页</a>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  props:['error'],
  layout: 'nofooter',
  data () {
    return {
      time: 4
    }
  },
  head () {
    return {
      title: '404',
      script: [{src: '/js/jquery-1.4.2.min.js'}]
    }
  },
  mounted () {
    let timer = setInterval(() => {
      this.time--
      if (this.time === 0) {
        this.time = '正在'
        window.location.href = '/'
        clearInterval(timer)
      }
    }, 1000)

    if (!$.browser.msie){
      $("#wrapper img").addClass('fade').delay(800).queue(function(next){
        $("#wrapper h1, #wrapper p").addClass("fade");
        $("#wrapper a.link").css("opacity", 1);
        next();
      });
    }else{
      $("#wrapper img, #wrapper h1, #wrapper p").addClass('fade');
      $('#wrapper a.link').css('opacity', 1);
    }
  }
}
</script>

<style type="text/css">
html{background:url("http://www.txzww.net/public/images/paper.jpg")!important;}
#wrapper a,#wrapper fieldset,#wrapper img{border:0;}
#wrapper a{color:#221919;text-decoration:none;outline:none;}
#wrapper a:hover{color:#3366cc;text-decoration:underline;}
#wrapper{font-size:24px;color:#B7AEB4;}
#wrapper a.link,#wrapper h1,#wrapper p{-webkit-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}
#wrapper{text-align:center;margin:100px auto;width:594px;}
#wrapper a.link{text-shadow:0px 1px 2px white;font-weight:600;color:#3366cc;opacity:0;}
#wrapper h1{text-shadow:0px 1px 2px white;font-size:24px;opacity:0;}
#wrapper img{-webkit-transition:opacity 1s ease-in-out;-moz-transition:opacity 1s ease-in-out;transition:opacity 1s ease-in-out;height:202px;width:199px;opacity:0;}
#wrapper p{text-shadow:0px 1px 2px white;font-weight:normal;font-weight:200;opacity:0;}
#wrapper .fade{opacity:1;}
@media only screen and (min-device-width:320px) and (max-device-width:480px){
  #wrapper{text-align:center;width:100%}
  #wrapper img{width:50%;height:50%;}
  #wrapper .fade{font-size:2em;}
  #wrapper .link{font-size:1.5em;}
}
</style>
