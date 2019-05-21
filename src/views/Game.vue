<template lang="pug">
.game-table
    .pin-table
        .pin-row(v-for="cardRow in pinRows" :key="cardRow.id")
            CardComponent(v-for="card in keyUp(cardRow.element)" :card="card.element" :key="card.id" @click="pinClick(card.element)").pin-card
    .drawing-area
        .drawing-stack(v-for="stack in this.stacks" :key="stack.id")
            CardPile(:cards="stack.element")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CardComponent, { ICard, suit } from '../components/Card.vue';
import CardPile from '../components/CardPile.vue';
import { Card } from '../models/card';
import { Pile, PinTable } from '../models/deck';
import { KeyedElement, keyUp } from '../utils/sequence';

@Component({
  components: { CardComponent, CardPile },
})
export default class Home extends Vue {

  private get pinRows() {
    if (this.pinTable) {
      return keyUp(this.pinTable!.cardRows);
    } else {
      return [];
    }
  }

  private keyUp = keyUp;

  private pinTable: PinTable<Card> | null = null;

  private stacks: Array<KeyedElement<Card[]>> = [];

  private howManyPins: number = 10;
  private howManyStacks: number = 3;

  public mounted() {
    const baseSuits: suit[] = ['hearts', 'diamonds'];
    const unflattenedCards = baseSuits.map((s) => new Array(10).fill(null).map((e, i) => new Card(s, i + 1, false)));
    const cards: Card[] = [];
    unflattenedCards.forEach((cs) => cs.forEach((c) => cards.push(c)));
    const pile = new Pile<Card>(cards);
    pile.shuffle();
    this.pinTable = new PinTable<Card>(pile.draw(this.howManyPins));
    const draw = [5, 3, 2];
    this.stacks = keyUp(draw.map((d) => pile.draw(d)));
    this.stacks.forEach((s) => s.element.slice(0, -1).forEach((c) => {
      if (c) {
        c.covered = true;
      }
    }));
  }

  private pinClick(card: Card) {
    if (this.pinTable) {
      this.pinTable.select(card);
    }
  }
}
</script>

<style>
.game-table {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

.pin-table {
  flex: 1 0 auto;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1em;
}
.drawing-area {
  background-color: green;
  flex: 1 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-evenly;
}
</style>
