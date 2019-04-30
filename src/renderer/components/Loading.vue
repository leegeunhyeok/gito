<template>
  <div id="loading"></div>
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
  background-color: #fff;
  border-radius: .5rem;
  z-index: 9998;
}
</style>
