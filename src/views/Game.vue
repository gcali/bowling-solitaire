<template lang="pug">
.game-table
    GameStatus
    .left-side
      .pin-table
          .left-status.status
            StatusVisualizer(label="Ball", value="1", :fixWidth="true")
          .right-status.status
            StatusVisualizer(label="Turn", value="12", :invertPosition="true", :fixWidth="true")
          .pin-row(v-for="cardRow in pinRows" :key="cardRow.id")
              CardComponent(v-for="card in keyUp(cardRow.element)" :card="card.element" :key="card.id" @click="pinClick(card.element)").pin-card
    .drawing-area
        .drawing-stacks
          .drawing-stack(v-for="stack in this.stacks" :key="stack.id")
              CardPile(:cards="stack.element" @cardSelected="myLog")
        .action-area
          button(@click="gameCore.removeTopFromStacks()") New ball
          button(@click="gameCore.resetCards()") End round
          button(@click="gameCore.suggestCard()") Suggest card

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
  background-color: green;
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
}

.drawing-stacks {
  padding: 1em;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-evenly;
}
.status {
  position: absolute;
  bottom: 18px;
}
.left-status {
  left: 0px;
}
.right-status {
  right: 0px;
}
</style>
