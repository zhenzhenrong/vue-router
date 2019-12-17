<template>
  <div id="app">
    <router-link tag="a" to="/home">首页</router-link>
    <router-link tag="a" to="/about">关于我们</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    console.log(this.$router, this.$route)
  },
  components: {
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
