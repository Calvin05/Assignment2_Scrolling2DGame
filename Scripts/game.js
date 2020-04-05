"use strict";
/*
    Author: Viet Cuong Nguyen
    ID: 300972502
    Last Modified by: Viet Cuong Nguyen
    Date last Modified: 04/03/2020
    Description: Shooting game
    Revision History: v1.9
*/
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var keyboardManager;
    var assets;
    var textureAtlas;
    var cityAtlas;
    var smokeAtlas;
    var assetManifest = [
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
        { id: "smokeIm", src: "./Assets/sprites/smokeatlas.png" },
        { id: "city", src: "./Assets/images/city.jpg" },
        { id: "m1", src: "./Assets/audio/m1.mp3" },
        { id: "smoke", src: "./Assets/audio/smoke.wav" },
        { id: "electric", src: "./Assets/audio/electric.wav" },
        { id: "beamsound", src: "./Assets/audio/beamsound.wav" },
        { id: "hit", src: "./Assets/audio/hit.wav" },
        { id: "beam2", src: "./Assets/audio/beam2.wav" },
        { id: "fireSound", src: "./Assets/audio/fire.wav" },
        { id: "bulletSound", src: "./Assets/audio/bulletSound.wav" },
        { id: "wind", src: "./Assets/audio/wind.wav" },
        { id: "shieldSound", src: "./Assets/audio/shieldSound.mp3" },
        { id: "backgroundMusic", src: "./Assets/audio/backgroundMusic.wav" },
        { id: "power", src: "./Assets/audio/PowerUp.wav" },
        { id: "laugh", src: "./Assets/audio/laugh.mp3" },
        { id: "b1", src: "./Assets/audio/b1.wav" },
        { id: "error", src: "./Assets/audio/error.wav" }
    ];
    var spriteData = {
        "images": {},
        "framerate": 20,
        "frames": [
            [1, 1, 335, 347, 0, -10, -3],
            [338, 1, 347, 333, 0, -5, -11],
            [1, 350, 333, 347, 0, -11, -4],
            [1, 699, 495, 99, 0, -7, -7],
            [687, 1, 220, 209, 0, -37, -45],
            [1, 800, 213, 209, 0, -43, -46],
            [216, 800, 217, 205, 0, -42, -47],
            [1, 1011, 209, 208, 0, -48, -46],
            [1, 1221, 210, 204, 0, -45, -45],
            [687, 212, 213, 202, 0, -38, -50],
            [338, 336, 268, 70, 0, 0, 0],
            [336, 408, 212, 203, 0, -43, -48],
            [336, 613, 200, 74, 0, 0, 0],
            [550, 416, 203, 198, 0, -51, -51],
            [755, 416, 202, 198, 0, -53, -53],
            [538, 616, 200, 74, 0, 0, 0],
            [740, 616, 196, 194, 0, -56, -53],
            [498, 692, 194, 188, 0, -55, -56],
            [435, 882, 180, 162, 0, 0, 0],
            [617, 882, 146, 162, 0, -14, 0],
            [765, 812, 177, 176, 0, -63, -61],
            [765, 990, 180, 162, 0, 0, 0],
            [216, 1007, 200, 47, 0, 0, 0],
            [212, 1056, 180, 162, 0, 0, 0],
            [213, 1220, 175, 169, 0, -64, -63],
            [213, 1391, 200, 47, 0, 0, 0],
            [394, 1056, 162, 162, 0, -8, 0],
            [558, 1046, 180, 162, 0, 0, 0],
            [390, 1220, 168, 163, 0, -67, -69],
            [560, 1210, 157, 145, 0, -72, -79],
            [740, 1154, 140, 71, 0, 0, 0],
            [719, 1227, 90, 130, 0, -4, -4],
            [560, 1357, 120, 24, 0, 0, 0],
            [608, 336, 70, 71, 0, 0, 0],
            [811, 1227, 70, 69, 0, 0, 0],
            [882, 1154, 65, 65, 0, 0, 0],
            [415, 1385, 120, 12, 0, 0, 0],
            [415, 1399, 92, 28, 0, 0, 0],
            [883, 1221, 50, 88, 0, 0, 0],
            [811, 1298, 70, 28, 0, 0, 0],
            [909, 1, 45, 62, 0, -3, 0],
            [435, 800, 50, 50, 0, 0, 0],
            [811, 1328, 89, 30, 0, 0, 0],
            [560, 1383, 90, 27, 0, 0, 0],
            [694, 692, 40, 40, 0, 0, 0],
            [682, 1359, 90, 27, 0, 0, 0],
            [652, 1388, 90, 29, 0, 0, 0],
            [774, 1360, 90, 29, 0, 0, 0],
            [744, 1391, 89, 28, 0, 0, 0],
            [909, 65, 40, 35, 0, 0, 0],
            [694, 734, 38, 35, 0, 0, 0],
            [866, 1360, 88, 30, 0, 0, 0],
            [835, 1392, 50, 46, 0, 0, 0],
            [902, 212, 50, 49, 0, 0, 0],
            [435, 852, 25, 26, 0, 0, 0],
            [883, 1311, 31, 14, 0, 0, 0],
            [652, 1383, 3, 3, 0, 0, 0]
        ],
        "animations": {
            "circle1": { "frames": [0, 1, 2], "speed": 0.2 },
            "title": { "frames": [3] },
            "spacekey": { "frames": [10] },
            "intro": { "frames": [12] },
            "start": { "frames": [15] },
            "boss1": { "frames": [19, 26, 18, 21, 23, 27], "speed": 0.1 },
            "boss2": { "frames": [19] },
            "supe1": { "frames": [22, 25], "speed": 0.1 },
            "e1": { "frames": [29, 28, 24, 20, 17, 16, 14, 13, 8, 7, 5, 11, 6, 4, 9, 56],
                "speed": 0.5, "next": false },
            "alien": { "frames": [30] },
            "highscore": { "frames": [31] },
            "beam4": { "frames": [32] },
            "skey": { "frames": [33] },
            "dkey": { "frames": [34] },
            "placeholder": { "frames": [35] },
            "beam5": { "frames": [36] },
            "playerscore": { "frames": [38] },
            "beam3": { "frames": [39] },
            "bullet": { "frames": [40] },
            "shield": { "frames": [41] },
            "fire1": { "frames": [43, 45, 51, 47, 48, 42, 37], "speed": 0.3 },
            "beamLabel": { "frames": [44] },
            "star": { "frames": [49] },
            "live": { "frames": [50] },
            "heart": { "frames": [52] },
            "laser": { "frames": [53] },
            "beam2": { "frames": [54] },
            "beam": { "frames": [55] },
        }
    };
    var cityData = {
        "images": {},
        "frames": [
            [0, 0, 2311, 600],
        ],
        "animations": {
            "city": { "frames": [0] },
        }
    };
    var smokeData = {
        "images": {},
        "frames": [
            [0, 0, 200, 200, 0, 100, 100],
            [200, 0, 200, 200, 0, 100, 100],
            [400, 0, 200, 200, 0, 100, 100],
            [600, 0, 200, 200, 0, 100, 100],
            [800, 0, 200, 200, 0, 100, 100],
            [0, 200, 200, 200, 0, 100, 100],
            [200, 200, 200, 200, 0, 100, 100],
            [400, 200, 200, 200, 0, 100, 100],
            [600, 200, 200, 200, 0, 100, 100],
            [800, 200, 200, 200, 0, 100, 100],
            [0, 400, 200, 200, 0, 100, 100],
            [200, 400, 200, 200, 0, 100, 100],
            [400, 400, 200, 200, 0, 100, 100],
            [600, 400, 200, 200, 0, 100, 100],
            [800, 400, 200, 200, 0, 100, 100],
            [0, 600, 200, 200, 0, 100, 100],
            [200, 600, 200, 200, 0, 100, 100],
            [400, 600, 200, 200, 0, 100, 100],
            [600, 600, 200, 200, 0, 100, 100],
            [800, 600, 200, 200, 0, 100, 100],
            [0, 800, 200, 200, 0, 100, 100],
            [200, 800, 200, 200, 0, 100, 100],
            [400, 800, 200, 200, 0, 100, 100],
            [600, 800, 200, 200, 0, 100, 100],
            [800, 800, 200, 200, 0, 100, 100],
            [0, 1000, 200, 200, 0, 100, 100],
            [200, 1000, 200, 200, 0, 100, 100],
            [400, 1000, 200, 200, 0, 100, 100],
            [600, 1000, 200, 200, 0, 100, 100],
            [800, 1000, 200, 200, 0, 100, 100],
            [0, 1200, 200, 200, 0, 100, 100]
        ],
        "animations": {
            "smoke": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                    10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23, 24, 25,
                    26, 27, 28, 29, 30, 31],
                "speed": 0.5,
                "next": false
            }
        },
    };
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
        keyboardManager = new managers.Keyboard();
        config.Game.keyboardManager = keyboardManager;
        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;
        cityData.images = [assets.getResult("city")];
        cityAtlas = new createjs.SpriteSheet(cityData);
        config.Game.CITY_ATLAS = cityAtlas;
        smokeData.images = [assets.getResult("smokeIm")];
        smokeAtlas = new createjs.SpriteSheet(smokeData);
        config.Game.SMOKE_ATLAS = smokeAtlas;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.INTRO:
                console.log("switch to Start Intro");
                currentScene = new scenes.Intro();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }
        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map