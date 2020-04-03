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
    var Intro = /** @class */ (function (_super) {
        __extends(Intro, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Intro() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        Intro.prototype.Start = function () {
            this._city = new objects.City();
            this._dImage = new objects.Image("dkey", 50, 50, false);
            this._dLabel = new objects.Label("Cheat: (+5 lives and +10 bullets)", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 125, 75, false);
            this._sImage = new objects.Image("skey", 50, 150, false);
            this._sLabel = new objects.Label("Shield: Remove enemies bullets", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 125, 175, false);
            this._spaceImage = new objects.Image("spacekey", 50, 250, false);
            this._spaceLabel = new objects.Label("Shoot Bullet", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 325, 275, false);
            this._bulletImage = new objects.Image("laser", 55, 365, false);
            this._bulletLabel = new objects.Label("Bullet", "25px", "Impact, Charcoal, sans-serif", "#ffffff", 115, 375, false);
            //instantiate a new Text object
            // buttons
            this._starButton = new objects.Button("start", 600, 530, true);
            this.Main();
        };
        Intro.prototype.Update = function () {
            this._city.Update();
        };
        Intro.prototype.Main = function () {
            this.addChild(this._city);
            this.addChild(this._starButton);
            this._starButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
                config.Game.LIVES = 3;
                config.Game.BULLET = 10;
                config.Game.SCORE = 0;
            });
            this.addChild(this._dLabel);
            this.addChild(this._dImage);
            this.addChild(this._sImage);
            this.addChild(this._sLabel);
            this.addChild(this._spaceLabel);
            this.addChild(this._spaceImage);
            this.addChild(this._bulletLabel);
            this.addChild(this._bulletImage);
        };
        return Intro;
    }(objects.Scene));
    scenes.Intro = Intro;
})(scenes || (scenes = {}));
//# sourceMappingURL=Intro.js.map