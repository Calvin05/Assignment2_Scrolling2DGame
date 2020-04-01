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
        };
        Start.prototype.Update = function () {
            this._city.Update();
            this.titleAniation();
        };
        Start.prototype.Main = function () {
            this.addChild(this._city);
            this.addChild(this._startButton);
            this.addChild(this._introButton);
            this.addChild(this._title);
            this.addChild(this._supeAnimation);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            // this.ShieldAnimation(this._supe.x, this._supe.y);
        };
        Start.prototype.FlyAnimation = function () {
            var chopperImg1 = new Image();
            var chopperImg2 = new Image();
            chopperImg1.src = "./Assets/images/supe1.png";
            chopperImg2.src = "./Assets/images/supe2.png";
            var spriteSheet = new createjs.SpriteSheet({
                images: [chopperImg1, chopperImg2],
                frames: { width: 200, height: 46, count: 2 },
                animations: {
                    fly: [0, 1, "fly"]
                }
            });
            var flyAnimation = new createjs.Sprite(spriteSheet);
            flyAnimation.x = 500;
            flyAnimation.y = 300;
            flyAnimation.spriteSheet.getAnimation('fly').speed = 0.1;
            flyAnimation.gotoAndPlay('fly');
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