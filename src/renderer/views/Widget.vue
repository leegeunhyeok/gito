<template>
  <div id="widget" @dblclick="refreshCommitHistory">
    <Loading v-if="loading"/>
    <div class="graph-wrap">
      <div class="week" v-for="(week, i) of history"
        :key="i"
      >
        <span class="day ignore-drag" v-for="(day, j) of week.days"
          @mouseover="showCommitDetail(day)"
          @mouseleave="hideCommitDetail"
          :key="j"
          :style="{ backgroundColor: getColor(day.count) }"
        >
        </span>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="commit-detail"
        v-if="showDetail">
        <b :style="{ color: getColor(commitCount) }"
        >{{ computedCommitCount }} contributions</b>
        on {{ commitDate }}
      </div>
    </transition>
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
  data () {
    return {
      commitCount: '',
      commitDate: '',
      showDetail: false
    }
  },
  computed: {
    computedCommitCount () {
      return this.commitCount || 'No'
    },
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
    },
    showCommitDetail (detail) {
      this.commitCount = detail.count
      this.commitDate = detail.date.replace(/-/g, '.')
      this.showDetail = true
    },
    hideCommitDetail () {
      this.commitCount = ''
      this.commitDate = ''
      this.showDetail = false
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

#widget {
  @include content;

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

  .commit-detail {
    position: absolute;
    bottom: 3px;
    color: #aaa;
    font-size: .9rem;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
