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
var objects;
(function (objects) {
    var Boss = /** @class */ (function (_super) {
        __extends(Boss, _super);
        // CONSTUCTOR
        function Boss(name, x, y, isCentered) {
            if (name === void 0) { name = "boss1"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, name, x, y, isCentered) || this;
            _this.canFire = true;
            _this._right = true;
            _this._dead = false;
            _this._live = 15;
            _this._dy = 0; //speed
            _this._dx = 0;
            _this._play = true;
            _this.isActive = false;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Boss.prototype, "BackgroundSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._backgroundSound;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Boss.prototype, "Play", {
            get: function () {
                return this._play;
            },
            set: function (v) {
                this._play = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Boss.prototype, "live", {
            get: function () {
                return this._live;
            },
            set: function (v) {
                this._live = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Boss.prototype, "Dead", {
            get: function () {
                return this._dead;
            },
            set: function (v) {
                this._dead = v;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Boss.prototype._checkBounds = function () {
            if (this.y < 0 + this.halfHeight + 20) {
                this.y = 0 + this.halfHeight + 20;
            }
            if (this.y > config.Game.SCREEN_HEIGHT - (this.halfHeight + 20)) {
                this.y = config.Game.SCREEN_HEIGHT - (this.halfHeight + 20);
            }
        };
        Boss.prototype._move = function () {
            if (this.x <= 1050) {
                // let tick = createjs.Ticker.getTicks();
                if ((createjs.Ticker.getTicks() % 60) == 0)
                    this._dy = Math.random() * (20) - 10;
                this.y += this._dy;
                // this.y += this._dy;
                this.position = new objects.Vector2(1050, this.y);
                // this.position = Vector2.subtract(this.velocity, this.position );
                this.position = objects.Vector2.subtract(this.position, this.velocity);
            }
            else {
                this.x -= 10;
            }
        };
        // PUBLIC METHODS
        Boss.prototype.Start = function () {
            this.name = "enemy";
            this.Reset();
        };
        Boss.prototype.Update = function () {
            this._move();
            this._checkBounds();
            this.PlayMusic();
        };
        Boss.prototype.Reset = function () {
            this.position = new objects.Vector2(1500, 100, this);
        };
        Boss.prototype.PlayMusic = function () {
            if (this._play) {
                this._backgroundSound = createjs.Sound.play("backgroundMusic");
                this._backgroundSound.loop = -1; // loop forever
                this._backgroundSound.volume = 0.7;
                createjs.Sound.play("laugh");
                this._play = false;
            }
        };
        Boss.prototype.canShoot = function () {
            if (!this.isColliding) {
                if (this.canFire) {
                    this.canFire = false;
                    return true;
                }
            }
            return false;
        };
        return Boss;
    }(objects.GameObject));
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=Boss.js.map