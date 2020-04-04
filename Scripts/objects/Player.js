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
var objects;
(function (objects) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player(name, x, y, isCentered) {
            if (name === void 0) { name = "supe1"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, name, x, y, isCentered) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "FlySound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._flySound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            // top boundary
            if (this.position.y <= this.halfHeight) {
                // this.position = new Vector2(this.halfWidth, this.position.y);
                this.position = new objects.Vector2(this.position.x, this.halfHeight);
            }
            // bottom boundary
            if (this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight) {
                // this.position = new Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
                this.position = new objects.Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
            // left boundary 
            if (this.position.x < this.halfWidth) {
                this.position = new objects.Vector2(this.halfWidth, this.y);
            }
        };
        Player.prototype._move = function () {
            if (config.Game.keyboardManager.moveForward) {
                this.y -= 7;
            }
            if (config.Game.keyboardManager.moveBackward) {
                this.y += 7;
            }
            if (config.Game.keyboardManager.moveLeft) {
                this.x -= 7;
            }
            if (config.Game.keyboardManager.moveRight) {
                this.x += 7;
            }
            // let newPositionY = util.Mathf.Lerp(this.position.y, this.y, 0.5);
            // this.position = new Vector2(this._horizontalPosition, newPositionY);
            // let newPositionY = util.Mathf.Lerp(this.y, this.position.y, 0.05);
            this.position = new objects.Vector2(this.x, this.y);
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
            this.name = "supe";
            this.x = 120;
            this.y = 300;
            this._flySound = createjs.Sound.play("wind");
            this._flySound.loop = -1; // loop forever
            this._flySound.volume = 0.5;
        };
        Player.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map