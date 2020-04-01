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
            this._scoreBoard = new managers.ScoreBoard();
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
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.LiveImage);
            this.addChild(this._scoreBoard.BulletLabel);
            this.addChild(this._scoreBoard.BulletImage);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.ScoreImage);
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
                    createjs.Sound.play("beamsound");
                    var bullet = new objects.Image("beam", this._supe.x + 48, this._supe.y, true);
                    this._bullets.push(bullet);
                    this.addChild(bullet);
                    this.fire = false;
                    this._scoreBoard.Bullet--;
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
                        var bullet = new objects.Image("beam2", enemy.x + 20, enemy.y + 50, true);
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
                        // this.ExploreAnimation(enemy.x, enemy.y);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        enemy.position = new objects.Vector2(-100, -200);
                        // enemy.died = true;
                        _this.removeChild(enemy);
                        _this._scoreBoard.Score += 100;
                        bullet.position = new objects.Vector2(-400, -400);
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
        Play.prototype.ExploreAnimation = function (obX, obY) {
            // let chopperImg1 = new Image();
            // let chopperImg2 = new Image();
            // let chopperImg3 = new Image();
            // let chopperImg4 = new Image();
            // let chopperImg5 = new Image();
            // let chopperImg6 = new Image();
            // let chopperImg7 = new Image();
            // let chopperImg8 = new Image();
            // let chopperImg9 = new Image();
            // let chopperImg10 = new Image();
            // let chopperImg11 = new Image();
            // let chopperImg12 = new Image();
            // let chopperImg13 = new Image();
            // let chopperImg14 = new Image();
            // let chopperImg15 = new Image();
            // let chopperImg16 = new Image();
            // let chopperImg17 = new Image();
            // let chopperImg18 = new Image();
            // let chopperImg19 = new Image();
            // let chopperImg20 = new Image();
            // let chopperImg21 = new Image();
            // let chopperImg22 = new Image();
            // let chopperImg23 = new Image();
            // let chopperImg24 = new Image();
            // let chopperImg25 = new Image();
            // let chopperImg26 = new Image();
            // let chopperImg27 = new Image();
            // let chopperImg28 = new Image();
            // let chopperImg29 = new Image();
            // let chopperImg30 = new Image();
            // let chopperImg31 = new Image();
            var _this = this;
            // chopperImg1.src = "./Assets/images/z1.png";
            // chopperImg2.src = "./Assets/images/z2.png";
            // chopperImg3.src = "./Assets/images/z3.png";
            // chopperImg4.src = "./Assets/images/z4.png";
            // chopperImg5.src = "./Assets/images/z5.png";
            // chopperImg6.src = "./Assets/images/z6.png";
            // chopperImg7.src = "./Assets/images/z7.png";
            // chopperImg8.src = "./Assets/images/z8.png";
            // chopperImg9.src = "./Assets/images/z9.png";
            // chopperImg10.src = "./Assets/images/z10.png";
            // chopperImg11.src = "./Assets/images/z11.png";
            // chopperImg12.src = "./Assets/images/z12.png";
            // chopperImg13.src = "./Assets/images/z13.png";
            // chopperImg14.src = "./Assets/images/z14.png";
            // chopperImg15.src = "./Assets/images/z15.png";
            // chopperImg16.src = "./Assets/images/z16.png";
            // chopperImg17.src = "./Assets/images/z17.png";
            // chopperImg18.src = "./Assets/images/z18.png";
            // chopperImg19.src = "./Assets/images/z19.png";
            // chopperImg20.src = "./Assets/images/z20.png";
            // chopperImg21.src = "./Assets/images/z21.png";
            // chopperImg22.src = "./Assets/images/z22.png";
            // chopperImg23.src = "./Assets/images/z23.png";
            // chopperImg24.src = "./Assets/images/z24.png";
            // chopperImg25.src = "./Assets/images/z25.png";
            // chopperImg26.src = "./Assets/images/z26.png";
            // chopperImg27.src = "./Assets/images/z27.png";
            // chopperImg28.src = "./Assets/images/z28.png";
            // chopperImg29.src = "./Assets/images/z29.png";
            // chopperImg30.src = "./Assets/images/z30.png";
            // chopperImg31.src = "./Assets/images/z31.png";
            //     let spriteSheet = new createjs.SpriteSheet({
            //         images: [ chopperImg1, chopperImg2, chopperImg3, chopperImg4, chopperImg5,
            //             chopperImg6,chopperImg7, chopperImg8, chopperImg9, chopperImg10, 
            //             chopperImg11, chopperImg12, chopperImg13, chopperImg14, chopperImg15, chopperImg16,
            //             chopperImg17, chopperImg18, chopperImg19, chopperImg20, chopperImg21,
            //             chopperImg22, chopperImg23, chopperImg24, chopperImg25, chopperImg26, chopperImg27,
            //             chopperImg28, chopperImg29, chopperImg30, chopperImg31],
            //         frames: { width: 200, height: 200, count: 32},
            //         animations: {
            //             explore: [0, 31, false]
            //         }
            //     });
            //     let animation = new createjs.Sprite(spriteSheet);
            //     animation.x = obX-100;
            //     animation.y = obY-60;
            //     animation.spriteSheet.getAnimation('explore').speed = 0.8;
            //     animation.gotoAndPlay('explore');
            //     this.addChild(animation);
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
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map