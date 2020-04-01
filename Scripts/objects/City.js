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
    var City = /** @class */ (function (_super) {
        __extends(City, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function City() {
            var _this = _super.call(this, config.Game.CITY_ATLAS, "city") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        City.prototype._checkBounds = function () {
            if (this.x <= -770) {
                this.Reset();
            }
        };
        City.prototype._move = function () {
            this.position = objects.Vector2.subtract(this.position, this.velocity);
        };
        // PUBLIC METHODS
        City.prototype.Start = function () {
            this._verticalSpeed = 5; // 5 px per frame
            this._horizontalSpeed = 5;
            this.velocity = new objects.Vector2(this._horizontalSpeed, 0);
            this.Reset();
        };
        City.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        City.prototype.Reset = function () {
            this.position = new objects.Vector2(0, 0);
        };
        return City;
    }(objects.GameObject));
    objects.City = City;
})(objects || (objects = {}));
//# sourceMappingURL=City.js.map