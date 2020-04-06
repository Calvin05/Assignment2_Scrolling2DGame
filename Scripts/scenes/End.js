"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
    Author: Viet Cuong Nguyen
    ID: 300972502
    Last Modified by: Viet Cuong Nguyen
    Date last Modified: 04/03/2020
    Description: Shooting game
    Revision History: v1.9
*/
var scenes;
(function (scenes) {
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        End.prototype.Start = function () {
            this._city = new objects.City();
            this._highScoreImage = new objects.Image("highscore", 600, 150, true);
            this._playerScore = new objects.Label("Your Score: " + config.Game.SCORE, "40px", "Impact, Charcoal, sans-serif", "#ffffff", 430, 390, false);
            this._playerScoreImage = new objects.Image("playerscore", 735, 400, true);
            this._message = new objects.Label(config.Game.MESSAGE, "50px", "Impact, Charcoal, sans-serif", "#ffffff", 600, 320, true);
            this._backButton = new objects.Button("start", 500, 530, true);
            this._menuLabel = new objects.Label("menu", "60px", "Impact, Charcoal, sans-serif", "#FFA07A", 700, 530, true);
            this._scoreboard = new managers.ScoreBoard();
            this.Main();
        };
        End.prototype.Update = function () {
            this._city.Update();
        };
        End.prototype.Main = function () {
            this.addChild(this._city);
            this.addChild(this._endLabel);
            this.addChild(this._backButton);
            this.addChild(this._scoreboard.HighScoreLabel);
            this._backButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
                config.Game.LIVES = 3;
                config.Game.BULLET = 10;
                config.Game.SCORE = 0;
            });
            this.addChild(this._message);
            this.addChild(this._menuLabel);
            this._menuLabel.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
            this.addChild(this._highScoreImage);
            this.addChild(this._playerScore);
            this.addChild(this._playerScoreImage);
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map