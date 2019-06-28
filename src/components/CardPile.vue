<template lang="pug">
    .pile
        .empty-slot-wrapper(:style="{paddingRight: padding, paddingBottom: padding}")
            Card(:card="null", :style="slotStyle")
        Card(v-for="o in this.translatedCards" v-if="!o.removed" :key="o.id" :card="o.card" :style="o.style" @click="cardSelected(o.card)")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Card from "./Card.vue";
@Component({ components: { Card } })
export default class CardPile extends Vue {
  private delta = 10;
  @Prop()
  private cards!: Card[];

  private get padding() {
    return Math.max((this.cards.length - 1) * this.delta, 0) + 2 + "px";
  }

  private cardSelected(o: any) {
    if (!o.covered) {
      this.$emit("cardSelected", o);
    }
  }

  private get translatedCards() {
    console.log(this.cards);
    return this.cards.map((card, index) => {
      return {
        style: {
          top: index * this.delta + "px",
          left: index * this.delta + "px",
          position: "absolute"
        },
        card,
        id: index
      };
    });
  }
  private get slotStyle() {
    return {
      visibility: this.cards.length > 0 ? "hidden" : "default"
    };
  }
}
</script>

<style>
.pile {
  position: relative;
}
</style>