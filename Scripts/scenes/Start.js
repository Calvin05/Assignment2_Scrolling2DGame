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
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.hit = false;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            // buttons
            this._startButton = new objects.Button("start", 450, 480, true);
            this._introButton = new objects.Button("intro", 700, 480, true);
            //  this._ocean = new objects.Ocean();
            this._city = new objects.City();
            this._title = new objects.Image("title", 600, 130, true);
            this._supeAnimation = this.FlyAnimation();
            this.Main();
            this._backgroundMusic = createjs.Sound.play("b1");
            this._backgroundMusic.loop = -1; // loop forever
            this._backgroundMusic.volume = 0.5;
        };
        Start.prototype.Update = function () {
            this._city.Update();
            this.titleAniation();
        };
        Start.prototype.Main = function () {
            var _this = this;
            this.addChild(this._city);
            this.addChild(this._startButton);
            this.addChild(this._introButton);
            this.addChild(this._title);
            this.addChild(this._supeAnimation);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
                config.Game.LIVES = 3;
                config.Game.BULLET = 10;
                config.Game.SCORE = 0;
                _this._backgroundMusic.stop();
            });
            this._introButton.on("click", function () {
                config.Game.SCENE = scenes.State.INTRO;
                _this._backgroundMusic.stop();
            });
            // this.ShieldAnimation(this._supe.x, this._supe.y);
        };
        Start.prototype.FlyAnimation = function () {
            var flyAnimation = new createjs.Sprite(config.Game.TEXTURE_ATLAS);
            flyAnimation.x = 500;
            flyAnimation.y = 300;
            flyAnimation.gotoAndPlay('supe1');
            // this.addChild(flyAnimation);
            return flyAnimation;
        };
        Start.prototype.titleAniation = function () {
            if (this._title.y < 100) {
                this.hit = false;
            }
            else if (this._title.y > 200) {
                this.hit = true;
            }
            if (this.hit) {
                this._title.y -= 3;
                this._supeAnimation.x -= 3;
            }
            else {
                this._title.y += 1;
                this._supeAnimation.x += 1;
            }
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map