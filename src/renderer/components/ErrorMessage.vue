<template>
  <div id="error">
    <div class="message">{{ errorMessage.message }}</div>
    <div class="detail">{{ errorMessage.detail }}</div>
  </div>
</template>

<script>
export default {
  name: 'error-message',
  computed: {
    errorMessage () {
      return {
        message: this.$store.state.error,
        detail: this.$store.state.errorDetail
      }
    }
  }
}
</script>

<style lang="scss">
#error {
  position: fixed;
  top: 35px;
  left: 50%;
  width: 90%;
  padding: 5px;
  z-index: 9999;
  box-sizing: border-box;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);

  .message {
    color: tomato;
  }

  .detail {
    color: #aaa;
    font-size: .8rem;
  }
}
</style>
