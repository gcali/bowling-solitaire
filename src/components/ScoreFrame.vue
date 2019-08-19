<template lang="pug">
.score-main-wrapper.value-color
    .round-indicator {{round}}
    .lower-side
        .indicators
            .indicator(v-for="indicator in indicators") {{indicator}}
        .total {{total}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { FrameScore } from '../models/score';
@Component({})
export default class ScoreFrame extends Vue {
  private get indicators() {
    return this.frame.rollScores;
  }
  private get total() {
    return this.frame.score + this.frame.prevScore;
  }
  @Prop({ required: true })
  private round!: number;

  @Prop({ required: true })
  private frame!: FrameScore;
}
</script>

<style scoped>
.score-main-wrapper {
  border: 1px solid yellowgreen;
  flex: 0 1 4em;
  margin: 0.5em 1em;
  /* margin-right: 0.2em; */
}
.round-indicator {
  border-bottom: 1px solid yellowgreen;
  padding: 0.25em 1em;
}
.lower-side {
  display: flex;
  flex-direction: column;
}
.indicators {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.indicator {
  padding: 0.25em 0.5em;
}
.indicator:not(:first-child) {
  border-left: 1px solid yellowgreen;
  border-bottom: 1px solid yellowgreen;
}
.indicator:last-child {
  border-left: 1px solid yellowgreen;
  border-bottom: 1px solid yellowgreen;
}

.total {
  padding: 0.25em 1em;
}
</style>
