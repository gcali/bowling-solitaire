<template lang="pug">
.game-wrapper
    .game-over(@click="this.handleGameOver", :class="{hide: !this.gameCore.isGameOver || this.hideGameOver}")
    GameStatus(:gameCore="this.gameCore")
    .game-table.table-background-color
      .left-side
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
      .drawing-area
          .drawing-stacks
            .drawing-stack(v-for="stack in this.stacks" :key="stack.id")
                CardPile(:cards="stack.element" @cardSelected="myLog")
          .score-area
              ScoreFrame(v-for="(frame, index) in this.gameCore.frameScores", :key="index", :frame="frame", :round="index + 1")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardComponent, { ICard, suit } from "../components/Card.vue";
import CardPile from "../components/CardPile.vue";
import GameStatus from "../components/GameStatus.vue";
import StatusVisualizer from "../components/StatusVisualizer.vue";
import ScoreFrame from "../components/ScoreFrame.vue";
import { Card } from "@common/models/card";
import { Pile, PinTable } from "@common/models/deck";
import { KeyedElement, keyUp } from "@common/utils/sequence";
import { GameCore } from "@common/models/game-core";

@Component({
  components: {
    CardComponent,
    CardPile,
    GameStatus,
    StatusVisualizer,
    ScoreFrame
  }
})
export default class Home extends Vue {
  private get pinRows() {
    return keyUp(this.gameCore.pinTable.cardRows);
  }

  private hideGameOver: boolean = false;

  private get stacks() {
    return keyUp(this.gameCore.stacks.map(s => s.cards));
  }

  private keyUp = keyUp;

  private gameCore: GameCore = new GameCore(new PinTable<Card>([]), []);
  private howManyStacks: number = 3;

  public mounted() {
    this.setGameCore(GameCore.generateRandomly());
  }

  private newGame() {
    this.setGameCore(GameCore.generateRandomly());
  }

  private setGameCore(gameCore: GameCore) {
    this.gameCore = gameCore;
    this.hideGameOver = false;
  }

  private myLog(e: any) {
    this.gameCore.removeSelectedWith(e);
  }

  private handleGameOver() {
    this.hideGameOver = true;
  }

  private pinClick(card: Card) {
    if (!this.gameCore.isGameOver) {
      this.gameCore.select(card);
    }
  }
}
</script>

<style>
.game-table {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.label-color {
  color: yellowgreen;
}

.value-color {
  color: yellow;
}

.table-color {
  color: green;
}
.table-background-color {
  background-color: green;
}

.dark-background-color {
  background-color: #025002;
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

.left-side {
  display: flex;
  flex: 0 1 30em;
  flex-direction: column;
  max-width: 100%;
}

.pin-table {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1em;
  position: relative;
}
.drawing-area {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 1 auto;
  align-items: center;
}

.action-area {
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: 36px;
  right: 15px;
}

.drawing-stack:not(:last-child) {
  margin-right: 1em;
}
.drawing-stacks {
  padding: 1em;
  flex: 0 1 10em;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
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

.hide {
  display: none !important;
}

button {
  border: none;
  padding: 0.5em 1em;
  box-shadow: 1px 1px 1px 1px black;
  transform: translate(-5px, -5px);
  text-transform: uppercase;
}
.score-area {
  display: flex;
  flex-wrap: wrap;
  max-width: 30em;
  justify-content: center;
}

.game-over {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: #00000057;
}

.game-over:after {
  content: "Game Over";
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5em 10em;
  color: yellow;
  background-color: darkgreen;
}

.game-wrapper {
  position: relative;
}
</style>
