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
            _this._random = 1000;
            _this._count = 5;
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
                        var bullet = new objects.Image("beam2", enemy.x, enemy.y, true);
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
                managers.Collision.AABBCheck(_this._boss, bullet);
                if (bullet.isColliding) {
                    _this._boss.live--;
                    _this.BossShieldAnimation(_this._boss.x - 130, _this._boss.y - 145);
                    createjs.Sound.play("./Assets/audio/electric.wav");
                    _this.removeChild(bullet);
                    bullet.position = new objects.Vector2(-200, -200);
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
                console.log("debug: " + this._random);
                if (createjs.Ticker.getTicks() % this._random == 0) {
                    if (!this._boss.isColliding) {
                        var bullet1 = new objects.Image("beam3", this._boss.x + 10, this._boss.y - 40, true);
                        this._enemybullets.push(bullet1);
                        this.BulletSpeed(bullet1, 10, 10, true);
                        this.addChild(bullet1);
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
                _this._enemybullets.forEach(function (bullet) {
                    managers.Collision.AABBCheck(_this._supe, bullet);
                    if (bullet.isColliding) {
                        _this._scoreBoard.Lives--;
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
            managers.Collision.AABBCheck(this._supe, this._live);
            if (this._live.isColliding) {
                this._live.Reset();
                this._scoreBoard.Bullet++;
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
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map