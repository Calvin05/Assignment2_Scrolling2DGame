"use strict";
var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        //public properties
        //comstructor
        function ScoreBoard() {
            //private instance members
            this._lives = 0;
            this._score = 0;
            this._bullet = 10;
            this._livesLabel = new objects.Label;
            this._scoreLabel = new objects.Label;
            this._bulletLabel = new objects.Label;
            this._highScoreLabel = new objects.Label;
            this._highScore = 0;
            this._initialize();
        }
        Object.defineProperty(ScoreBoard.prototype, "BulletImage", {
            get: function () {
                return this._bulletImage;
            },
            set: function (v) {
                this._bulletImage = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "LiveImage", {
            get: function () {
                return this._liveImage;
            },
            set: function (v) {
                this._liveImage = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "ScoreImage", {
            get: function () {
                return this._scoreImage;
            },
            set: function (v) {
                this._scoreImage = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (v) {
                this._highScore = v;
                config.Game.HIGH_SCORE = this._highScore;
                this._highScoreLabel.setText("High Score: " + this._highScore);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScoreLabel", {
            get: function () {
                return this._highScoreLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "ScoreLabel", {
            get: function () {
                return this._scoreLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "LivesLabel", {
            get: function () {
                return this._livesLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            get: function () {
                return this._score;
            },
            set: function (v) {
                this._score = v;
                config.Game.SCORE = this._score;
                this._scoreLabel.text = " : " + this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "BulletLabel", {
            get: function () {
                return this._bulletLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Lives", {
            get: function () {
                return this._lives;
            },
            set: function (v) {
                this._lives = v;
                config.Game.LIVES = this._lives;
                this._livesLabel.text = " : " + this._lives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Bullet", {
            get: function () {
                return this._bullet;
            },
            set: function (v) {
                this._bullet = v;
                config.Game.BULLET = this._bullet;
                this._bulletLabel.text = " : " + this._bullet;
            },
            enumerable: true,
            configurable: true
        });
        //private method
        // public ScoreLabel:objects.Label;
        // public LivesLabel:objects.Label;
        ScoreBoard.prototype._initialize = function () {
            this._livesLabel = new objects.Label("3", "25px", "Impact, Charcoal, sans-serif", "#fff", 50, 30, true);
            this._scoreLabel = new objects.Label("0", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 247, 30, true);
            this._bulletLabel = new objects.Label(" : 10", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 160, 30, true);
            this._highScoreLabel = new objects.Label("0", "70px", "Impact, Charcoal, sans-serif", "#ffffff", 600, 50, true);
            this.Lives = config.Game.LIVES;
            this.Score = config.Game.SCORE;
            this.HighScore = config.Game.HIGH_SCORE;
            this._liveImage = new objects.Image("live", 28, 30, true);
            this._bulletImage = new objects.Image("beamLabel", 122, 30, true);
            this._scoreImage = new objects.Image("star", 225, 30, true);
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=ScoreBoard.js.map