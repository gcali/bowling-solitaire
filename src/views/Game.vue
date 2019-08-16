<template lang="pug">
.game-table.table-background-color
    GameStatus(:gameCore="this.gameCore")
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
          //- button(@click="gameCore.endBall()", :class="{hide: !this.gameCore.isFirstRound}") New ball
          //- button(@click="gameCore.endTurn()", :class="{hide: this.gameCore.isFirstRound}") End round
    .drawing-area
        .drawing-stacks
          .drawing-stack(v-for="stack in this.stacks" :key="stack.id")
              CardPile(:cards="stack.element" @cardSelected="myLog")

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardComponent, { ICard, suit } from "../components/Card.vue";
import CardPile from "../components/CardPile.vue";
import GameStatus from "../components/GameStatus.vue";
import StatusVisualizer from "../components/StatusVisualizer.vue";
import { Card } from "../models/card";
import { Pile, PinTable } from "../models/deck";
import { KeyedElement, keyUp } from "../utils/sequence";
import { GameCore } from "@/services/game-core";

@Component({
  components: { CardComponent, CardPile, GameStatus, StatusVisualizer }
})
export default class Home extends Vue {
  private myLog(e: any) {
    this.gameCore.removeSelectedWith(e);
  }
  private get pinRows() {
    return keyUp(this.gameCore.pinTable.cardRows);
  }

  private keyUp = keyUp;

  private gameCore: GameCore = new GameCore(new PinTable<Card>([]), []);
  private howManyStacks: number = 3;

  public mounted() {
    this.gameCore = GameCore.generateRandomly();
  }

  private get stacks() {
    return keyUp(this.gameCore.stacks.map(s => s.cards));
  }

  private pinClick(card: Card) {
    this.gameCore.select(card);
  }
}
</script>

<style>
.game-table {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
  flex: 1 0 auto;
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
  flex: 1 0 auto;
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

.drawing-stacks {
  padding: 1em;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-evenly;
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
  display: none;
}

button {
  border: none;
  padding: 0.5em 1em;
  box-shadow: 1px 1px 1px 1px black;
  transform: translate(-5px, -5px);
}
</style>
