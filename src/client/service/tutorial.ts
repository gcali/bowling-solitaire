import introJs from 'intro.js';
import { GameCore } from '@common/models/game-core';

export interface GameCoreBackup {
    gameCore: GameCore;
    hideGameOver: boolean;
}

export interface GameComponent {
    highlightCentral: boolean;
    highlightBackRow: boolean;
    readonly gameCore: GameCore;
    getGameCoreBackup: () => GameCoreBackup;
    restoreGameCoreBackup: (backup: GameCoreBackup) => void;
    setGameCore: (gameCore: GameCore) => void;
}

interface Step {
    intro: string;
    element?: string;
    scrollTo?: 'element';
    showPrev?: boolean;
    hideNext?: boolean;
    change?: (() => void);
    flag?: (v: boolean) => void;
}

export const tutorialFactory = (gameComponent: GameComponent): IntroJs.IntroJs => {
    const backup = gameComponent.getGameCoreBackup();
    const newGameCore = GameCore.generateRandomly();
    gameComponent.setGameCore(newGameCore);
    for (let i = 0; i < 4; i++) {
        gameComponent.gameCore.endBall();
    }

    const created = introJs();

    const steps: Step[] = [
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
                'To do gameComponent, you need to match groups of cards from the pin table with cards from ' +
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
            flag: (v) => gameComponent.highlightBackRow = v,
        },
        {
            intro:
                'You can select the central pin <em>only</em> if you select another legal ' +
                'pin adjacent to it',
            element: '.left-side',
            flag: (v) => gameComponent.highlightCentral = v,
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
    ];

    steps.forEach((step) => step.showPrev = true);

    steps[0].showPrev = false;
    steps[steps.length - 1].hideNext = true;

    const introSteps = steps.map(stepMapper);

    created.setOptions({
        skipLabel: 'Quit',
        showBullets: false,
        showStepNumbers: false,
        exitOnOverlayClick: false,
        disableInteraction: true,
        steps: introSteps,
    });
    created.onchange((e) => {
        const currentStep = (created as any)._currentStep;
        steps.forEach((step, index) => {
            const isCurrentStep = index === currentStep;
            if (step.flag) {
                step.flag(isCurrentStep);
            }
            if (isCurrentStep && step.change) {
                step.change();
            }
        });
    });
    created.onafterchange((e) => {
        gameComponent.gameCore.pinTable.flatCards.forEach((c) => c.selected = false);
    });
    created.onexit(() => {
        gameComponent.highlightCentral = false;
        gameComponent.highlightBackRow = false;
        gameComponent.restoreGameCoreBackup(backup);
    });

    return created;
};


const stepMapper = (step: Step): IntroJs.Step => {
    const classes = [];
    if (step.hideNext) {
        classes.push('hide-next');
    }
    if (step.showPrev) {
        classes.push('show-prev');
    }
    return {
        ...step,
        tooltipClass: classes.join(' '),
    };
};
