<template lang="pug">
.pin-table
    .left-status-group
    .status
        StatusVisualizer(label="Ball", :value="this.gameCore.isFirstRoll ? '1' : '2'")
    .status
        StatusVisualizer(label="Turn", :value="this.gameCore.turnCounter")
    .pin-row(v-for="cardRow in pinRows" :key="cardRow.id")
        CardComponent(v-for="card in keyUp(cardRow.element)" :card="card.element" :key="card.id" @click="pinClick(card.element)").pin-card
    .action-area
    button.end-roll.dark-background-color.label-color(@click="gameCore.endBall()", :class="{hide: this.gameCore.isGameOver}") End roll
    button.end-roll.dark-background-color.label-color(@click="newGame", :class="{hide: !this.gameCore.isGameOver}") New game
</template>

<script lang="ts">
import CardComponent, { ICard, suit } from '../components/Card.vue';
import StatusVisualizer from '../components/StatusVisualizer.vue';
import Component from 'vue-class-component';
import Vue from 'vue';
import { GameCore } from '../../common/models/game-core';
import { Prop, Emit } from 'vue-property-decorator';
import { keyUp } from '@common/utils/sequence';

@Component({
  components: {
    CardComponent,
    StatusVisualizer,
  },
})
export default class PinTable extends Vue {
  @Prop()
  private gameCore!: GameCore;

  private keyUp = keyUp;

  @Emit('newGame')
  private newGame() { }

  private get pinRows() {
    return keyUp(this.gameCore.pinTable.cardRows);
  }


}
</script>

<style scoped>
.pin-table {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1em;
  position: relative;
}

.end-roll {
  cursor: pointer;
}

.left-status-group {
  position: absolute;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  left: 0px;
  align-items: flex-start;
}

.status:first-child {
  margin-bottom: 0.5em;
}

.pin-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.pin-row:not(:last-child) {
  margin-bottom: 0.5em;
}

.pin-card:not(:last-child) {
  margin-right: 1em;
}
</style>