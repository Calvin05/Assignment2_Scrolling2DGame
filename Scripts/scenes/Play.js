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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            // private _enemy:objects.Enemy;
            _this.fire = true;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._supe = new objects.Player();
            this._city = new objects.City();
            this._bullets = new Array();
            // this._enemy = new objects.Enemy();
            this._enemybullets = new Array();
            this._ememies = new Array();
            this._live = new objects.Live();
            this.AddEnemies(5);
            // createjs.Sound.play("m1");
            this.Main();
        };
        Play.prototype.AddEnemies = function (number) {
            var _this = this;
            console.log("enemy num: " + this._ememies.length);
            var createEnemy = setInterval(function () {
                if (_this._ememies.length < number) {
                    var enemy = new objects.Enemy();
                    _this._ememies.push(enemy);
                    _this.addChild(enemy);
                    console.log("CREATE");
                    _this.FireGun(enemy, _this._enemybullets);
                }
                else {
                    clearInterval(createEnemy);
                }
            }, 1000);
        };
        Play.prototype.Update = function () {
            this._city.Update();
            this._supe.Update();
            this._live.Update();
            // this._bullets.forEach(bullet => {
            //     bullet.x += 10;
            //     bullet.position.x += 10;
            // });
            this.UpdatePlayerFire();
            this.UpdateBullets();
            this.UpdatePosition();
        };
        Play.prototype.Main = function () {
            this.addChild(this._city);
            this.addChild(this._supe);
            this.addChild(this._live);
            // this.addChild(this._enemy);
        };
        Play.prototype.FireGun = function (enemy, bullArray) {
            var _this = this;
            if (enemy.canShoot()) {
                var fire_1 = setInterval(function () {
                    if (!enemy.isColliding) {
                        var bullet = new objects.Image(config.Game.ASSETS.getResult("beam2"), enemy.x, enemy.y, true);
                        bullArray.push(bullet);
                        _this.addChild(bullet);
                    }
                    else
                        clearInterval(fire_1);
                }, 1000);
            }
            //});
        }; //
        Play.prototype.UpdatePlayerFire = function () {
            if (config.Game.keyboardManager.fire) {
                if (this.fire) {
                    createjs.Sound.play("beamsound");
                    var bullet = new objects.Image(config.Game.ASSETS.getResult("beam"), this._supe.x + 48, this._supe.y, true);
                    this._bullets.push(bullet);
                    this.addChild(bullet);
                    this.fire = false;
                }
            }
            if (!config.Game.keyboardManager.fire) {
                this.fire = true;
            }
        };
        Play.prototype.UpdateBullets = function () {
            var _this = this;
            this._bullets.forEach(function (bullet) {
                _this.BulletSpeed(bullet, 10, 10, false);
            });
            this._ememies.forEach(function (enemy) {
                enemy.addEventListener("tick", function () {
                    if (enemy.canShoot()) {
                        var bullet = new objects.Image(config.Game.ASSETS.getResult("beam2"), enemy.x + 20, enemy.y + 50, true);
                        _this._enemybullets.push(bullet);
                        _this.addChild(bullet);
                    }
                });
            });
            this._enemybullets.forEach(function (bullet) {
                _this.BulletSpeed(bullet, 10, 10, true);
            });
        };
        Play.prototype.BulletSpeed = function (eBullet, eSpeed, eMove, side) {
            if (side === void 0) { side = false; }
            //enemy direction
            if (side == true) {
                eBullet.x -= eSpeed;
                eBullet.position.x -= eMove;
                if (eBullet.x <= 0) {
                    this.removeChild(eBullet);
                }
            }
            //player direction
            else {
                eBullet.x += eSpeed;
                eBullet.position.x += eMove;
                if (eBullet.y >= 1200) {
                    this.removeChild(eBullet);
                }
            }
        };
        Play.prototype.UpdatePosition = function () {
            var _this = this;
            this._ememies.forEach(function (enemy) {
                _this.addChild(enemy);
                enemy.Update();
                // this._enemybullets.forEach((bullet)=>{
                //     managers.Collision.AABBCheck(this._supe, bullet);
                //     if(bullet.isColliding) {
                //         if(managers.Collision.live <= 0) {
                //             this.ExploreAnimation(this._player.x, this._player.y);
                //         } else {
                //             this.ShieldAnimation(this._player.x, this._player.y);
                //         }
                //         bullet.position = new objects.Vector2(-200,-200);
                //         this.removeChild(bullet);
                //     //config.Game.SCENE_STATE = scenes.State.END;
                //     }
                // });
                _this._bullets.forEach(function (bullet) {
                    managers.Collision.AABBCheck(enemy, bullet);
                    if (bullet.isColliding) {
                        // this.ExploreAnimation(enemy.x, enemy.y);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        enemy.position = new objects.Vector2(-100, -200);
                        // enemy.died = true;
                        _this.removeChild(enemy);
                        bullet.position = new objects.Vector2(-200, -200);
                        _this.removeChild(bullet);
                        // Play.point += 100;
                    }
                });
                // check collision player and enemies
                // managers.Collision.Check(enemy, this._player);
                // if(this._player.isColliding)
                // {
                //     console.log("debug: Player collision");
                //     //createjs.Sound.play("./Assets/sounds/crash.wav");
                //     //config.Game.SCENE_STATE = scenes.State.END;
                //     //createjs.Sound.stop();//
                // }
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map