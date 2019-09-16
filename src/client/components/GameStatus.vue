<template lang="pug">
.game-status.dark-background-color
  .hamburger(@click="hamburgerClick")
    Hamburger
  .main-status
    StatusVisualizer(label="Score", :value="this.gameCore.totalScore")
    StatusVisualizer(label="Selected", :value="this.selected", :class="{hide: this.gameCore.isGameOver}")
    StatusVisualizer(label="Game over", value="", :class="{hide: !this.gameCore.isGameOver}")
  .user-name.label-color.unselectable(:title="userName") {{userName}}
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import StatusVisualizer from './StatusVisualizer.vue';
import Hamburger from './Hamburger.vue';
import { GameCore } from '@common/models/game-core';
import { store } from '@client/utils/store';
@Component({ components: { StatusVisualizer, Hamburger } })
export default class GameStatus extends Vue {

  private get userName(): string {
    if (this.store.state.userData) {
      return this.store.state.userData.userName;
    }
    return '';
  }

  private store = store;
  @Prop({ required: true })
  private gameCore!: GameCore;

  @Emit('hamburgerClick')
  public hamburgerClick(e: MouseEvent) { }

  private get selected(): string {
    const selected = this.gameCore.selectedSum;
    if (selected === 0) {
      return '∅';
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
  flex-wrap: nowrap;
}

.main-status {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding-left: 2em;
  line-height: 1.1em;
}

.hamburger {
  position: relative;
  left: 1em;
  width: 1.5em;
  height: 1.5em;
}

.user-name {
  flex-grow: 0.5;
  flex-shrink: 1;
  flex: 0 1 5em;
  max-width: 5em;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>