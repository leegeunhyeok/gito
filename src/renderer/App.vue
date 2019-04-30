<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'gito',
  computed: {
    view () {
      return this.$store.state.userView
    }
  },
  watch: {
    view () {
      this.changeView(this.view)
    }
  },
  created () {
    this.$store.dispatch('GET_COMMIT_HISTORY')
  },
  methods: {
    changeView (path) {
      this.$router.push({ path })
    }
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

.hook-drag {
  -webkit-app-region: drag;
}

.ignore-drag {
  -webkit-app-region: no-drag;
  user-select: all;
  pointer-events: all;
}
</style>
