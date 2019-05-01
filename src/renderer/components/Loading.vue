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

<style>
#loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  border-radius: .5rem;
  z-index: 9998;
}
</style>
