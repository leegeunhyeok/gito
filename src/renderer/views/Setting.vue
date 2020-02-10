<template>
  <div id="setting">
    <div class="setting-wrap">
      <span class="spinner-wrap" v-show="checking">
        <fa-icon icon="spinner"/>
      </span>
      <input class="ignore-drag"
        :disabled="checking"
        v-model.trim="userName"
        @keydown.enter="userCheck"
        placeholder="username"
      >
      <button class="ignore-drag"
        :style="buttonStyle"
        :disabled="checking"
        @click="userCheck"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      >+</button>
    </div>
  </div>
</template>

<script>
import Themes from '@/common/theme'

export default {
  name: 'setting-view',
  data () {
    return {
      userName: '',
      checking: false,
      hover: false
    }
  },
  computed: {
    errorCount () {
      return this.$store.state.errorCount
    },
    buttonStyle () {
      let currentTheme = Themes.SCHEME[this.$store.state.userTheme]
      return {
        backgroundColor: this.hover ? currentTheme[3] : currentTheme[2]
      }
    }
  },
  watch: {
    errorCount () {
      this.checking = false
    }
  },
  methods: {
    userCheck () {
      if (this.userName) {
        this.checking = true
        this.$store.commit('SET_USER_NAME', this.userName)
        this.$store.dispatch('GET_COMMIT_HISTORY')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

#setting {
  @include content;

  .spinner-wrap {
    position: absolute;
    display: block;
    bottom: 12px;
    left: 50%;
    color: #aaa;

    svg {
      -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
      -webkit-animation: spinner 1s linear infinite;
              animation: spinner 1s linear infinite;
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  input {
    outline: none;
    border: none;
    border-radius: .4rem;
    height: 30px;
    padding: 0 10px;
    font-size: 1rem;
    color: var(--text-color);
    background-color: var(--secondary-color);
    -webkit-transition: .3s;
            transition: .3s;
  }

  button {
    cursor: pointer;
    outline: none;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: .4rem;
    color: #fff;
    margin-top: -5px;
    font-size: 1rem;
    -webkit-transition: .3s;
            transition: .3s;

    &:disabled {
      cursor: not-allowed;
      background-color: #aaa !important;
    }
  }
}
</style>
