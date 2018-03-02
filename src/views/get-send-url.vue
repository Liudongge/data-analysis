<template>
<div>
</div>
</template>
<script>
import Vue from 'vue'
function getUrlParams(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg)  // 匹配目标参数
  return r == null ? r : unescape(r[2]) // 返回参数值
}
export default {
  name: 'chart',
  data() {
    return {}
  },
  created() {
    let code = this.$route.query.code
    let codeUrl = `http://localhost:3000/api/public/data/code`
    Vue.http({
      method: 'get',
      url: codeUrl,
      params: {'code': code}
    }).then(result => {
      if (result.body.code === 200) {
      }
    }).catch(response => {
      console.log(response)
    })
  }
}
</script>
