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
            _this.shield = true;
            _this.cheat = true;
            _this._random = 1000;
            _this._count = 7;
            _this._shield = 3;
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
            this._scoreBoard = new managers.ScoreBoard();
            this._boss = new objects.Boss();
            this._bossLive = new objects.Label("0", "15px", "Impact, Charcoal, sans-serif", "#fff", -100, -100, true);
            this.AddEnemies(this._count);
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
            if (this._boss.isActive) {
                this._boss.Update();
            }
            this.WinOrLoseCondition();
        };
        Play.prototype.Main = function () {
            this.addChild(this._city);
            this.addChild(this._supe);
            this.addChild(this._live);
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.LiveImage);
            this.addChild(this._scoreBoard.BulletLabel);
            this.addChild(this._scoreBoard.BulletImage);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.ScoreImage);
            this.addChild(this._bossLive);
            this.addChild(this._boss);
            // this.addChild(this._enemy);
        };
        Play.prototype.FireGun = function (enemy, bullArray) {
            var _this = this;
            if (enemy.canShoot()) {
                var fire_1 = setInterval(function () {
                    if (!enemy.isColliding) {
                        var bullet = new objects.Image("beam2", enemy.x, enemy.y + 30, true);
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
                    if (this._scoreBoard.Bullet > 0) {
                        createjs.Sound.play("beamsound");
                        var bullet = new objects.Image("beam", this._supe.x + 48, this._supe.y, true);
                        this._bullets.push(bullet);
                        this.addChild(bullet);
                        this.fire = false;
                        this._scoreBoard.Bullet--;
                    }
                    else {
                        createjs.Sound.play("error");
                    }
                }
            }
            if (!config.Game.keyboardManager.fire) {
                this.fire = true;
            }
            if (config.Game.keyboardManager.shield) {
                if (this.shield) {
                    if (this._shield > 0) {
                        this.playerShield();
                        this._shield--;
                        this.shield = false;
                        createjs.Sound.play("shieldSound");
                    }
                }
            }
            if (!config.Game.keyboardManager.shield) {
                this.shield = true;
            }
            if (config.Game.keyboardManager.cheat) {
                if (this.cheat) {
                    this.cheat = false;
                    createjs.Sound.play("power");
                    this._scoreBoard.Lives += 5;
                    this._scoreBoard.Bullet += 10;
                }
            }
            if (!config.Game.keyboardManager.cheat) {
                this.cheat = true;
            }
        };
        Play.prototype.UpdateBullets = function () {
            var _this = this;
            this._bullets.forEach(function (bullet) {
                _this.BulletSpeed(bullet, 10, 10, false);
                managers.Collision.AABBCheck(_this._boss, bullet);
                if (bullet.isColliding) {
                    if (_this._boss.live > 1) {
                        _this._boss.live--;
                        _this.BossShieldAnimation(_this._boss.x - 130, _this._boss.y - 145);
                        createjs.Sound.play("electric");
                        _this.removeChild(bullet);
                        bullet.position = new objects.Vector2(-200, -200);
                    }
                    else {
                        _this._boss.live--;
                        _this.ExploreAnimation(_this._boss.x, _this._boss.y);
                        createjs.Sound.play("smoke");
                        // this._boss.live--;
                    }
                }
                ;
            });
            this._enemybullets.forEach(function (bullet) {
                _this.BulletSpeed(bullet, 10, 10, true);
            });
            if (this._count < 1) {
                this._boss.isActive = true;
            }
            if (this._boss.isActive) {
                if (createjs.Ticker.getTicks() % 60 == 0) {
                    this._random = Math.round(util.Mathf.RandomRange(20, 100));
                }
                if (createjs.Ticker.getTicks() % this._random == 0) {
                    if (!this._boss.isColliding) {
                        var bullet1 = new objects.Image("fire1", this._boss.x + 10, this._boss.y - 40, true);
                        this._enemybullets.push(bullet1);
                        createjs.Sound.play("fireSound");
                        this.BulletSpeed(bullet1, 20, 20, true);
                        this.addChild(bullet1);
                        //    this.BeamShooting(this._boss.x, this._boss.y);
                    }
                }
                if (this._boss.live < 8) {
                    if (createjs.Ticker.getTicks() % (this._random * 3) == 0) {
                        this.BeamShooting(this._boss.x, this._boss.y);
                    }
                }
            }
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
                if (eBullet.x >= 1300) {
                    this.removeChild(eBullet);
                    eBullet.position = new objects.Vector2(-400, -1000);
                }
            }
        };
        Play.prototype.UpdatePosition = function () {
            var _this = this;
            this._ememies.forEach(function (enemy) {
                _this.addChild(enemy);
                enemy.Update();
                _this._enemybullets.forEach(function (bullet) {
                    managers.Collision.AABBCheck(_this._supe, bullet);
                    if (bullet.isColliding) {
                        _this._scoreBoard.Lives--;
                        createjs.Sound.play("hit");
                        bullet.position = new objects.Vector2(-200, -200);
                        _this.removeChild(bullet);
                    }
                });
                _this._bullets.forEach(function (bullet) {
                    managers.Collision.AABBCheck(enemy, bullet);
                    if (bullet.isColliding) {
                        _this.ExploreAnimation(enemy.x, enemy.y);
                        createjs.Sound.play("smoke");
                        _this._count--;
                        // this.ExploreAnimation(enemy.x, enemy.y);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        enemy.Dead = true;
                        enemy.position = new objects.Vector2(-100, -200);
                        // enemy.died = true;
                        _this.removeChild(enemy);
                        _this._scoreBoard.Score += 100;
                        bullet.position = new objects.Vector2(-400, -400);
                        _this.removeChild(bullet);
                        // Play.point += 100;
                    }
                });
                _this._bossLive.x = _this._boss.x + 10;
                _this._bossLive.y = _this._boss.y - 95;
                _this._bossLive.text = _this._boss.live.toString();
            });
            managers.Collision.AABBCheck(this._supe, this._live);
            if (this._live.isColliding) {
                this._live.Reset();
                this._scoreBoard.Bullet++;
                createjs.Sound.play("bulletSound");
            }
        };
        Play.prototype.ExploreAnimation = function (obX, obY) {
            var _this = this;
            var SpriteSheet = config.Game.SMOKE_ATLAS;
            var smoke = new createjs.Sprite(SpriteSheet);
            smoke.x = obX;
            smoke.y = obY;
            smoke.gotoAndPlay("smoke");
            this.addChild(smoke);
            setTimeout(function () {
                _this.removeChild(smoke);
            }, 900);
        };
        Play.prototype.BossShieldAnimation = function (obX, obY) {
            var _this = this;
            var SpriteSheet = config.Game.TEXTURE_ATLAS;
            var shield = new createjs.Sprite(SpriteSheet);
            shield.x = obX;
            shield.y = obY;
            shield.gotoAndPlay("e1");
            this.addChild(shield);
            setTimeout(function () {
                _this.removeChild(shield);
            }, 900);
        };
        Play.prototype.BeamShooting = function (obX, obY) {
            var _this = this;
            var bullet1 = new objects.Image("beam3", obX, obY - 100, true);
            this.addChild(bullet1);
            var createBeam = setInterval(function () {
                _this._enemybullets.push(bullet1);
                // createjs.Sound.play("./Assets/audio/beam2.wav");
                _this.BulletSpeed(bullet1, 30, 30, true);
            }, 500);
            createjs.Sound.play("beam2");
            var bullet2 = new objects.Image("beam3", obX, obY + 100, true);
            this.addChild(bullet2);
            var createBeam2 = setInterval(function () {
                _this._enemybullets.push(bullet2);
                // createjs.Sound.play("./Assets/audio/beam2.wav");
                _this.BulletSpeed(bullet2, 30, 30, true);
            }, 800);
        };
        Play.prototype.playerShield = function () {
            var _this = this;
            this._enemybullets.forEach(function (bullet) {
                _this.removeChild(bullet);
                bullet.position = new objects.Vector2(-400, -400);
            });
            var SpriteSheet = config.Game.TEXTURE_ATLAS;
            var shield = new createjs.Sprite(SpriteSheet);
            shield.x = this._supe.x - 100;
            shield.y = this._supe.y - 200;
            shield.gotoAndPlay("circle1");
            this.addChild(shield);
            setTimeout(function () {
                _this.removeChild(shield);
            }, 500);
        };
        Play.prototype.WinOrLoseCondition = function () {
            if (this._boss.live < 1) {
                config.Game.SCORE += 1000 + (50 * config.Game.BULLET) + (100 * config.Game.LIVES);
                if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
                this.removesound();
                config.Game.SCENE = scenes.State.END;
            }
            if (config.Game.LIVES < 1) {
                if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
                this.removesound();
                config.Game.SCENE = scenes.State.END;
            }
        };
        Play.prototype.removesound = function () {
            this._supe.FlySound.stop();
            if (this._boss.isActive) {
                this._boss.BackgroundSound.stop();
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map