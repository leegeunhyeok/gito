<template>
  <div id="widget">
    <Loading v-if="loading"/>
  </div>
</template>

<script>
import Loading from '@/components/Loading'

export default {
  name: 'widget-view',
  components: {
    Loading
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.createCommitGraph()
  },
  methods: {
    createCommitGraph () {
      // TODO: Create graph canvas
    }
  }
}
</script>

<style>
#widget {
  position: relative;
  width: 100%;
  height: 100%;
  padding: .5rem;
  border-radius: .5rem;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);
  box-sizing: border-box;
}
</style>
