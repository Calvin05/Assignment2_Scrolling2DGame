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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // PUBLIC PROPERTIES
        // CONSTUCTOR
        function Enemy() {
            var _this = _super.call(this, config.Game.ASSETS.getResult("enemy"), new objects.Vector2(), true) || this;
            _this.canFire = true;
            _this._right = true;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Enemy.prototype._checkBounds = function () {
            if (this.position.x < -this.width) {
                this.Reset();
            }
        };
        Enemy.prototype._move = function () {
            // this.position = Vector2.subtract(this.velocity, this.position );
            this.position = objects.Vector2.subtract(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Enemy.prototype.Start = function () {
            this.name = "enemy";
            this.Reset();
        };
        Enemy.prototype.Update = function () {
            this._move();
            this._checkBounds();
            this.Animation();
        };
        Enemy.prototype.Reset = function () {
            // this._verticalSpeed = util.Mathf.RandomRange(5,10);
            // this._horizontalSpeed =  util.Mathf.RandomRange(-2,2);// 5 px per frame
            this._verticalSpeed = util.Mathf.RandomRange(-2, 2);
            this._horizontalSpeed = util.Mathf.RandomRange(5, 10);
            ;
            this.velocity = new objects.Vector2(this._horizontalSpeed, this._verticalSpeed);
            // let randomX = util.Mathf.RandomRange(0 + this.halfWidth, config.Game.SCREEN_WIDTH - this.width);
            // let randomY = util.Mathf.RandomRange(-this.height * 2, - this.height);
            var randomX = util.Mathf.RandomRange(config.Game.SCREEN_WIDTH + this.width * 2, config.Game.SCREEN_WIDTH);
            var randomY = util.Mathf.RandomRange(0 + this.halfHeight, config.Game.SCREEN_HEIGHT - this.height);
            this.position = new objects.Vector2(randomX, randomY, this);
        };
        Enemy.prototype.canShoot = function () {
            if (!this.isColliding) {
                if (this.canFire) {
                    this.canFire = false;
                    return true;
                }
            }
            return false;
        };
        Enemy.prototype.Animation = function () {
            var _this = this;
            this.addEventListener("tick", function () {
                var tick = createjs.Ticker.getTicks();
                // console.log("debug tick : " + i);
                if (tick % 30 == 0) {
                    if (_this._right) {
                        _this.rotation += util.Mathf.RandomRange(9.9, 10);
                        _this._right = false;
                    }
                    else {
                        _this.rotation -= util.Mathf.RandomRange(9.9, 10);
                        _this._right = true;
                    }
                }
            });
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map