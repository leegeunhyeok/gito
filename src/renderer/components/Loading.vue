<template>
  <div id="loading">
    <span class="spinner-wrap">
      <fa-icon icon="spinner"/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'loading-view'
}
</script>

<style lang="scss">
#loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: .5rem;
  z-index: 9998;

  .spinner-wrap {
    position: absolute;
    display: block;
    top: 45%;
    left: 50%;
    color: #aaa;

    svg {
      -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
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
}
</style>
