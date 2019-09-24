<template lang="pug">
.game-status.dark-background-color
  .hamburger(@click="hamburgerClick")
    Hamburger
  .main-status
    StatusVisualizer(label="Score", :value="this.gameCore.totalScore")
    StatusVisualizer(v-if="!this.gameCore.isGameOver", label="Selected", :value="this.selected")
    StatusVisualizer(v-if="this.gameCore.isGameOver", label="Game over", value="")
  .user-name.label-color.unselectable(:title="userName") {{userName}}
  .help.label-color.unselectable(@click="this.askForHelp") ?
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

  private get selected(): string {
    const selected = this.gameCore.selectedSum;
    if (selected === 0) {
      return '∅';
    } else {
      return selected.toString();
    }
  }

  private store = store;
  @Prop({ required: true })
  private gameCore!: GameCore;

  @Emit('help')
  public askForHelp(): void { }

  @Emit('hamburgerClick')
  public hamburgerClick(e: MouseEvent) { }
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

.help {
  flex: 0 0 1.1em;
  border: 2px solid yellowgreen;
  border-radius: 50%;
  margin-right: 1em;
}
</style>