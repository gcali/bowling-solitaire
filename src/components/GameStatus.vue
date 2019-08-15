<template lang="pug">
.game-status 
    StatusVisualizer(label="Points", value="999")
    StatusVisualizer(label="Sum", value="99")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import StatusVisualizer from "./StatusVisualizer.vue";
@Component({ components: { StatusVisualizer } })
export default class GameStatus extends Vue {}
</script>

<style scoped>
.game-status {
  background-color: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: darkgreen;
  background-color: #025002;
  flex: 1 1 100%;
  justify-content: center;
}
</style>