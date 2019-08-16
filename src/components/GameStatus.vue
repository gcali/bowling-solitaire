<template lang="pug">
.game-status.dark-background-color
    StatusVisualizer(label="Score", :value="this.gameCore.totalScore")
    StatusVisualizer(label="Selected", :value="this.selected")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import StatusVisualizer from "./StatusVisualizer.vue";
import { GameCore } from "@/services/game-core";
@Component({ components: { StatusVisualizer } })
export default class GameStatus extends Vue {
  @Prop({ required: true })
  private gameCore!: GameCore;

  private get selected(): string {
    const selected = this.gameCore.selectedSum;
    if (selected == 0) {
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
  position: relative;
}
</style>