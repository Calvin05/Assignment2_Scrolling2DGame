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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Player() {
            var _this = _super.call(this, config.Game.ASSETS.getResult("supe"), 0, 0, true) || this;
            _this.Start();
            return _this;
        }
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