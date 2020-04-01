"use strict";
var config;
(function (config) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.SCREEN_WIDTH = 1200;
        Game.SCREEN_HEIGHT = 600;
        Game.FPS = 60; // 60 Frames per second
        Game.CLOUD_NUM = 5;
        Game.LIVES = 3;
        Game.SCORE = 0;
        Game.HIGH_SCORE = 0;
        Game.BULLET = 10;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map