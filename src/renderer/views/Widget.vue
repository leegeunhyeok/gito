<template>
  <div id="widget" @dblclick="refreshCommitHistory">
    <Loading v-if="loading"/>
    <div class="graph-wrap">
      <div class="week" v-for="(week, i) of history"
        :key="i"
      >
        <span class="day ignore-drag" v-for="(day, j) of week.days"
          :key="j"
          :style="{ backgroundColor: getColor(day.count) }"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Themes from '@/common/theme.js'
import Loading from '@/components/Loading'

export default {
  name: 'widget-view',
  components: {
    Loading
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      history: state => state.commitHistory,
      historyMeta: state => state.commitHistoryMeta,
      userTheme: state => state.userTheme
    })
  },
  methods: {
    refreshCommitHistory () {
      this.$store.dispatch('GET_COMMIT_HISTORY')
    },
    getColor (commitCount) {
      const max = this.historyMeta.max.count
      const idx = parseInt(commitCount / (max / 4)) + 1
      if (commitCount === 0) {
        return Themes[this.userTheme][0]
      } else {
        return Themes[this.userTheme][idx >= 4 ? 4 : idx]
      }
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
    -webkit-app-region: no-drag;

    .week {
      float: left;
      max-width: 10px;

      .day {
        float: left;
        width: 8px;
        height: 8px;
        margin: 1px;
      }
    }
  }
}
</style>
