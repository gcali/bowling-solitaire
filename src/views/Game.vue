<template lang="pug">
.game-table
    .pin-table
        .pin-row(v-for="cardRow in pinRows" :key="cardRow.id")
            p {{cardRow.cards.length}}
            .pin-card(v-for="card in cardRow.cards" :key="card.id")
    .drawing-area
        .drawing-stack
        .drawing-stack
        .drawing-stack
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Card {
    id: number;
}

interface CardRow {
    cards: Card[];
    id: number;
}

@Component({
  components: {},
})
export default class Home extends Vue {

    private get pinRows(): CardRow[] {
        const result: CardRow[] = [];
        for (let i = 0; i < 4; i++) {
            result.push({cards: new Array(4-i).fill(null).map((e: any, index) => ({id: index})), id: i});
        }
        return result;

    }
    private get pinCards(): Card[] {
        const baseCard: Card = {
            id: 0
        };
        return new Array(this.howManyPins).fill(baseCard).map((e: Card, index: number) => ({id: index}));
    }

    private howManyPins: number = 10;
    private howManyStacks: number = 3;
}
</script>

<style>
.game-table {
    display: flex;
    flex-direction: row;
    flex-wrap: true;
}

.pin-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.pin-row:not(:last-child) {
    margin-bottom: 0.5em;
}

.pin-card {
    background-color: red;
    width: 2em;
    height: 4em;
    border: 1px solid black;
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
}
.drawing-area {
    flex: 1 0 auto;
}
</style>
