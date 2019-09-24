<template lang="pug">
    .drawing-area-root
        .drawing-stacks
            .drawing-stack(v-for="stack in this.stacks" :key="stack.id")
                CardPile(:cards="stack.element" @cardSelected="remove")
        .score-area
            ScoreFrame(v-for="(frame, index) in this.gameCore.frameScores", :key="index", :frame="frame", :round="index + 1")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { GameCore } from '@common/models/game-core';
import { keyUp } from '@common/utils/sequence';
import { Card } from '@common/models/card';
import CardPile from './CardPile.vue';
import ScoreFrame from './ScoreFrame.vue';
@Component({
  components: {
    CardPile,
    ScoreFrame,
  },
})
export default class DrawingArea extends Vue {
  @Prop()
  private gameCore!: GameCore;

  private remove(e: Card) {
    this.gameCore.removeSelectedWith(e);
  }

  private get stacks() {
    return keyUp(this.gameCore.stacks.map((s) => s.cards));
  }


}
</script>

<style scoped>
.drawing-area-root {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.drawing-stacks {
  padding: 1em;
  flex: 0 1 10em;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
}

.drawing-stack:not(:last-child) {
  margin-right: 1em;
}

.score-area {
  display: flex;
  flex-wrap: wrap;
  max-width: 30em;
  justify-content: center;
}
</style>
