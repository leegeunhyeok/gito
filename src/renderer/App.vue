<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'gito',
    created () {
      this.$store.dispatch('GET_COMMIT_HISTORY')
    }
  }
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  padding: 10px;
  box-sizing: border-box;
}
</style>
