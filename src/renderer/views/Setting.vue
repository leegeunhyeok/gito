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
        :disabled="checking"
        @click="userCheck"
      >+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setting-view',
  data () {
    return {
      userName: '',
      checking: false
    }
  },
  computed: {
    errorCount () {
      return this.$store.state.errorCount
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
#setting {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: .5rem;
  border-radius: .5rem;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);
  box-sizing: border-box;
  text-align: center;

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
    border-radius: .5rem;
    padding: 5px 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    -webkit-transition: .3s;
            transition: .3s;
  }

  button {
    cursor: pointer;
    outline: none;
    width: 25px;
    height: 25px;
    border: none;
    border-radius: .5rem;
    color: #fff;
    background-color: dodgerblue;
    -webkit-transition: .3s;
            transition: .3s;

    &:hover {
      background-color: #125699;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #aaa;
    }
  }
}
</style>
