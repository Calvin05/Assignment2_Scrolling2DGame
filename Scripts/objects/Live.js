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
    var Live = /** @class */ (function (_super) {
        __extends(Live, _super);
        // PUBLIC PROPERTIES
        // CONSTUCTOR
        function Live(name, x, y, isCentered) {
            if (name === void 0) { name = "laser"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, name, x, y, isCentered) || this;
            _this._right = true;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Live.prototype._checkBounds = function () {
            if (this.position.x < 0 - this.width) {
                this.Reset();
            }
        };
        Live.prototype._move = function () {
            // this.position = Vector2.add(this.position, this.velocity);
            this.position = objects.Vector2.subtract(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Live.prototype.Start = function () {
            this._horizontalSpeed = 5; // 5 px per frame
            this.velocity = new objects.Vector2(this._horizontalSpeed, 0);
            this.Reset();
        };
        Live.prototype.Update = function () {
            this.rotation += 5;
            this._move();
            this._checkBounds();
        };
        Live.prototype.Reset = function () {
            var randomX = util.Mathf.RandomRange(config.Game.SCREEN_WIDTH + this.width + 100, config.Game.SCREEN_WIDTH + this.width + 300);
            var randomY = util.Mathf.RandomRange(0 + this.width, config.Game.SCREEN_HEIGHT - this.height);
            this.position = new objects.Vector2(randomX, randomY, this);
        };
        return Live;
    }(objects.GameObject));
    objects.Live = Live;
})(objects || (objects = {}));
//# sourceMappingURL=Live.js.map