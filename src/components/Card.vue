<template lang="pug">
    .card-spot
        .card(v-if="this.card !== null && !this.card.removed" @click="$emit('click')" :class="{selected: card.selected}")
            .top-left
                .value {{card.value}}
                .suit {{suitMarker}}
            .center-value {{card.value}}
            .bottom-right
                .value {{card.value}}
                .suit {{suitMarker}}
            .cover(:style="coverStyle")
</template>

<script lang="ts">
export type suit = "hearts" | "spades" | "clubs" | "diamonds";

export interface ICard {
  value: number;
  suit: suit;
  covered?: boolean;
  selected: boolean;
  removed: boolean;
}
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class Card extends Vue {
  @Prop()
  public card!: ICard | null;

  public get coverStyle() {
    return {
      display: this.card!.covered === true ? "block" : "none"
    };
  }

  public get suitMarker(): string {
    return this.card!.suit[0].toUpperCase();
  }
}
</script>

<style scoped>
.card-spot {
  width: 4em;
  height: 6em;
  margin-bottom: 2px;
  position: relative;
  border: 1px solid black;
}
.card {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 100, 0);
  box-shadow: 2px 2px 2px black;
  user-select: none;
}

.card.selected:before {
  position: absolute;
  width: 100%;
  height: 100%;
  content: "";
  border: 4px solid red;
}

.top-left {
  position: absolute;
  top: 2px;
  left: 2px;
  display: flex;
  flex-direction: row;
}

.bottom-right {
  position: absolute;
  bottom: 2px;
  right: 2px;
  display: flex;
  flex-direction: row;
}

.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>