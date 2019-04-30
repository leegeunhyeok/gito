<template>
  <div id="widget">
    <Loading v-if="loading"/>
    <div class="graph-wrap">
      <div class="week" v-for="(week, i) of history"
        :key="i"
      >
        <span class="day" v-for="(day, j) of week.days"
          :key="j"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Loading from '@/components/Loading'

export default {
  name: 'widget-view',
  components: {
    Loading
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      history: state => state.commitHistory
    })
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

<style lang="scss">
#widget {
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

  .graph-wrap {

    .week {
      float: left;
      max-width: 10px;

      .day {
        float: left;
        width: 8px;
        height: 8px;
        background-color: green;
        margin: 1px;
      }
    }
  }
}
</style>
