<template lang="pug">
.game-wrapper
    GameStatus(:gameCore="this.gameCore", @hamburgerClick="showMenu=!showMenu", @help="this.handleHelp")
    .game-table.table-background-color(@click="showMenu=false")
      .left-side
        PinTableComponent(:gameCore="this.gameCore", @newGame="newGame")
      DrawingArea.drawing-area(:gameCore="this.gameCore")
    LeftMenu(:shouldShow="showMenu",@close="showMenu = false", @login="showLogin = true", @logout="showLogout = true")
    Login(:shouldShow="showLogin", @close="showLogin = false")
    Logout(:shouldShow="showLogout", @close="showLogout = false")
    Modal(@close="this.handleGameOver", :shouldShow="this.gameCore.isGameOver && !this.hideGameOver") GAME OVER

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DrawingArea from '../components/DrawingArea.vue';
import PinTableComponent from '../components/PinTable.vue';
import Modal from '../components/Modal.vue';
import Login from '../components/Login.vue';
import Logout from '../components/Logout.vue';
import GameStatus from '../components/GameStatus.vue';
import LeftMenu from '../components/LeftMenu.vue';
import { Card } from '@common/models/card';
import { Pile, PinTable } from '@common/models/deck';
import { GameCore } from '@common/models/game-core';

import introJs from 'intro.js';

@Component({
  components: {
    GameStatus,
    LeftMenu,
    Modal,
    Login,
    Logout,
    DrawingArea,
    PinTableComponent,
  },
})
export default class Home extends Vue {
  private showLogin: boolean = false;
  private showLogout: boolean = false;

  private showMenu: boolean = false;

  private hideGameOver: boolean = false;

  private gameCore: GameCore = new GameCore(new PinTable<Card>([]), []);
  private howManyStacks: number = 3;

  public handleHelp(): void {
    introJs().start();
    alert('Hello!');
  }

  public mounted() {
    this.setGameCore(GameCore.generateRandomly());
  }

  private newGame() {
    this.setGameCore(GameCore.generateRandomly());
  }

  private setGameCore(gameCore: GameCore) {
    this.gameCore = gameCore;
    this.hideGameOver = false;
  }

  private handleGameOver() {
    this.hideGameOver = true;
  }

  private pinClick(card: Card) {
    if (!this.gameCore.isGameOver) {
      this.gameCore.select(card);
    }
  }
}
</script>

<style>
.game-table {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  max-width: 60em;
  margin: 0 auto;
  margin-top: 2em;
}

.label-color {
  color: yellowgreen;
}

.value-color {
  color: yellow;
}

.label-background-color {
  background-color: yellowgreen;
}

.value-background-color {
  background-color: yellow;
}

.table-color {
  color: green;
}
.table-background-color {
  background-color: green;
}

.dark-background-color {
  background-color: #025002;
}

.left-side {
  display: flex;
  flex: 0 1 30em;
  flex-direction: column;
  max-width: 100%;
}

.drawing-area {
  flex: 1 1 auto;
}

.action-area {
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: 36px;
  right: 15px;
}

.hide {
  display: none !important;
}

button {
  border: none;
  padding: 0.5em 1em;
  box-shadow: 1px 1px 1px 1px black;
  transform: translate(-5px, -5px);
  text-transform: uppercase;
}
.game-wrapper {
  position: relative;
  overflow: hidden;
}
</style>
