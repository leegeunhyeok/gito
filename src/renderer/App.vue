<template>
  <div id="app">
    <transition name="message" mode="out-in">
      <ErrorMessage v-if="showError"/>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'gito',
  components: {
    ErrorMessage
  },
  data () {
    return {
      showError: false,
      messageTimer: null
    }
  },
  computed: {
    view () {
      return this.$store.state.userView
    },
    errorCount () {
      return this.$store.state.errorCount
    }
  },
  watch: {
    view () {
      this.changeView(this.view)
    },
    errorCount () {
      this.showErrorMessage()
    }
  },
  created () {
    this.$store.dispatch('GET_COMMIT_HISTORY')
  },
  methods: {
    changeView (path) {
      this.$router.push({ path })
    },
    showErrorMessage () {
      clearTimeout(this.messageTimer)
      if (this.showError) {
        this.showError = false
        this.messageTimer = setTimeout(() => {
          this.showError = true
          this.messageTimer = setTimeout(() => {
            this.showError = false
          }, 2500)
        }, 500)
      } else {
        this.showError = true
        this.messageTimer = setTimeout(() => {
          this.showError = false
        }, 2500)
      }
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

.message-enter-active, .message-leave-active {
  transition: opacity .5s;
}
.message-enter, .message-leave-to {
  opacity: 0;
}
</style>
