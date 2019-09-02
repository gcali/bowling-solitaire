<template lang="pug">
.game-status.dark-background-color
    StatusVisualizer(label="Score", :value="this.gameCore.totalScore")
    StatusVisualizer(label="Selected", :value="this.selected", :class="{hide: this.gameCore.isGameOver}")
    StatusVisualizer(label="Game over", value="", :class="{hide: !this.gameCore.isGameOver}")
    .hamburger(@click="hamburgerClick")
      Hamburger
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import StatusVisualizer from "./StatusVisualizer.vue";
import Hamburger from "./Hamburger.vue";
import { GameCore } from "@common/models/game-core";
@Component({ components: { StatusVisualizer, Hamburger } })
export default class GameStatus extends Vue {
  @Prop({ required: true })
  private gameCore!: GameCore;

  @Emit("hamburgerClick")
  hamburgerClick(e: MouseEvent) {}

  private get selected(): string {
    const selected = this.gameCore.selectedSum;
    if (selected === 0) {
      return "∅";
    } else {
      return selected.toString();
    }
  }
}
</script>

<style scoped>
.game-status {
  background-color: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color: darkgreen;
  background-color: #025002; */
  flex: 1 1 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
  align-items: center;
  z-index: 2;
}

.hamburger {
  position: absolute;
  left: 1em;
  width: 1.5em;
  height: 1.5em;
}
</style>