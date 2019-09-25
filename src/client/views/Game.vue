<template lang="pug">
.game-wrapper
    GameStatus(:gameCore="this.gameCore", @hamburgerClick="showMenu=!showMenu", @help="this.handleHelp")
    .game-table.table-background-color(@click="showMenu=false")
      PinTableComponent.left-side(
        :gameCore="this.gameCore"
        @newGame="newGame"
        data-intro="Hello"
        :highlightCentral="this.highlightCentral"
        :highlightBack="this.highlightBackRow"
      )
      DrawingArea.drawing-area(:gameCore="this.gameCore", data-intro='World')
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

    private highlightCentral: boolean = false;
    private showLogin: boolean = false;
    private showLogout: boolean = false;

    private showMenu: boolean = false;

    private hideGameOver: boolean = false;

    private gameCore: GameCore = new GameCore(new PinTable<Card>([]), []);
    private howManyStacks: number = 3;
    private highlightBackRow: boolean = false;

    public handleHelp(): void {
        const oldGameCore = this.gameCore;
        const newGameCore = GameCore.generateRandomly();
        this.setGameCore(newGameCore);
        for (let i = 0; i < 4; i++) {
            this.gameCore.endBall();
        }
        const created = introJs();
        created.setOptions({
            skipLabel: 'Quit',
            showBullets: false,
            showStepNumbers: false,
            exitOnOverlayClick: false,
            disableInteraction: true,
            steps: [
                {
                    intro:
                        'Welcome to bowling solitaire!',
                },
                {
                    intro:
                        'Bowling solitaire is a single player card game where you try and clear the pin table ' +
                        'in the least possible number of card draws, or <em>strikes</em>'
                    ,
                },
                {
                    intro:
                        'To do this, you need to match groups of cards from the pin table with cards from ' +
                        'the drawing area; each ball you roll is represented by a sequence of matches',
                },
                {
                    intro:
                        'Every round is composed of two rolls and you have 10 rounds to try and reach the  ' +
                        'highest possible score; the scoring rules are the same of regular bowling, strikes ' +
                        'and spares included',
                },
                {
                    intro:
                        'The game is played with 20 cards from 2 suits (1-10 for each suit) that compose the ' +
                        '<em>pin table</em> and the <em>drawing area</em>',
                },
                {
                    intro:
                        'Here you can find the <em>pin table</em>; ' +
                        'it contains the ten pins you are trying to strike down',
                    element: '.left-side',
                },
                {
                    intro:
                        'Here\'s the <em>drawing area</em>; you can use the cards of the drawing area ' +
                        'to remove matching group of cards from the pin table.<br>',
                    element: '.drawing-area',
                },
                {
                    intro:
                        'Each card you select from here represents a movement from the <em>ball</em> ' +
                        'you are currently throwing',
                    element: '.drawing-area',
                },
                {
                    intro:
                        'You start your game with the first ball of the first round; you end your round ' +
                        'every two rolls or at each strike, whichever comes first',
                    element: '.left-status-group',
                },
                {
                    intro:
                        'At each roll, you need to select up to three adjacent cards from the pin table; ' +
                        'at least one must be selected',
                    element: '.left-side',
                },
                {
                    intro:
                        'The first match of each roll is special:',
                    element: '.left-side',
                },
                {
                    intro:
                        'You cannot select any pin on the last row',
                    element: '.left-side',
                },
                {
                    intro:
                        'You can select the central pin <em>only</em> if you select another legal ' +
                        'pin adjacent to it',
                    element: '.left-side',
                },
                {
                    intro: 'Selecting a group of cards is the first step in removing them',
                },
                {
                    intro:
                        'You remove a group of cards by matching the sum of their values ' +
                        'with a card from the drawing area having the same rightmost figure',
                },
                {
                    intro:
                        'For instance, a group of two cards with values 4 and 5 can be matched ' +
                        'with a card with value 9.<br>' +
                        'A group of three cards with values 9, 8 and 3 can be matched ' +
                        'with a card with value 10.',
                },
                {
                    intro:
                        'When you select a group of cards, its sum is shown in the status bar, along ' +
                        'with your current score',
                    element: '.game-status',
                },
                {
                    intro:
                        'When you don\'t find any other match or you want to skip to your next ball, ' +
                        'click on end roll',
                    element: '.end-roll',
                },
                {
                    intro:
                        'A summary of your scoring and turns will be shown in the score area',
                    element: '.score-area',
                    scrollTo: 'element',
                },
            ],
        });
        created.onchange((e) => {
            const isCentralStep = (created as any)._currentStep === 12;
            const isBackRowStep = (created as any)._currentStep === 11;
            this.highlightCentral = isCentralStep;
            this.highlightBackRow = isBackRowStep;
        });
        // created.onafterchange((e) => {
        //     this.gameCore.pinTable.flatCards.forEach((c) => c.selected = false);
        // });
        created.onexit(() => {
            this.highlightCentral = false;
            this.highlightBackRow = false;
            this.setGameCore(oldGameCore);
        });
        created.start();
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

.introjs-prevbutton,
.hideNext .introjs-nextbutton {
    display: none !important;
}

/* .showNext .introjs-nextbutton {
    display: inline !important;
} */

.showPrev .introjs-prevbutton {
    display: inline !important;
}

.introjs-helperLayer {
    background-color: rgba(28, 127, 0, 0.8) !important;
}

.introjs-tooltip {
    margin: 0 0.6em;
}
</style>
