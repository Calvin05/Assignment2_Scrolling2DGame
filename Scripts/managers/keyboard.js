"use strict";
var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        // constructors
        function Keyboard() {
            this.fireOnce = true;
            this.enabled = true;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // private methods
        // public methods
        Keyboard.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                // case config.Keys.W:
                case config.Keys.UP_ARROW:
                    this.moveForward = true;
                    break;
                // case config.Keys.A:
                case config.Keys.LEFT_ARROW:
                    this.moveLeft = true;
                    break;
                // case config.Keys.S:
                case config.Keys.DOWN_ARROW:
                    this.moveBackward = true;
                    break;
                // case config.Keys.D:
                case config.Keys.RIGHT_ARROW:
                    this.moveRight = true;
                    break;
                case config.Keys.SPACE:
                    if (this.fireOnce) {
                        this.fire = true;
                        this.fireOnce = false;
                        console.debug("debug: fire once" + this.fireOnce);
                        break;
                    }
                    else {
                        this.fire = false;
                        break;
                    }
                case config.Keys.S:
                    this.shield = true;
                    break;
                case config.Keys.D:
                    this.cheat = true;
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                // case config.Keys.W:
                case config.Keys.UP_ARROW:
                    this.moveForward = false;
                    break;
                // case config.Keys.A:
                case config.Keys.LEFT_ARROW:
                    this.moveLeft = false;
                    break;
                case config.Keys.DOWN_ARROW:
                    this.moveBackward = false;
                    break;
                case config.Keys.RIGHT_ARROW:
                    this.moveRight = false;
                    break;
                case config.Keys.SPACE:
                    this.fireOnce = true;
                    this.fire = false;
                    break;
                case config.Keys.S:
                    this.shield = false;
                    break;
                case config.Keys.D:
                    this.cheat = false;
                    break;
            }
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
//# sourceMappingURL=keyboard.js.map