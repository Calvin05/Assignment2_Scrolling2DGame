module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBER
        private _city:objects.City;
        private _supe:objects.Player;
        private _bullets:Array<objects.Image>;
        // private _enemy:objects.Enemy;
        private fire = true;
        private shield = true;
        private cheat = true;
        private _ememies:objects.Enemy[];
        private _enemybullets: Array<objects.Image>;
        private _live:objects.Live;
        private _boss:objects.Boss;
        private _scoreBoard:managers.ScoreBoard;
        private _random:number = 1000;
        private _count:number = 5;
        private _bossLive:objects.Label;
        private _shield: number = 3;
        
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._supe = new objects.Player();
            this._city = new objects.City();
            this._bullets = new Array<objects.Image>();
            // this._enemy = new objects.Enemy();
            this._enemybullets = new Array<objects.Image>();
            this._ememies = new Array<objects.Enemy>();
            this._live = new objects.Live();
            this._scoreBoard = new managers.ScoreBoard();
            this._boss = new objects.Boss();
            this._bossLive = new objects.Label("0", "15px", "Impact, Charcoal, sans-serif", "#fff", -100, -100, true);
            this.AddEnemies(this._count);
            // createjs.Sound.play("m1");
            this.Main();
        }     
        public AddEnemies(number:Number):void{
            console.log("enemy num: " + this._ememies.length);
            let createEnemy = setInterval(()=>{
                if(this._ememies.length < number)
                {
                    let enemy = new objects.Enemy();
                    this._ememies.push(enemy);
                    this.addChild(enemy)
                    console.log("CREATE")
                    this.FireGun(enemy, this._enemybullets);
                }
                else {
                    clearInterval(createEnemy)
                }
            }, 1000)
        }   
        
        public Update(): void 
        {
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
            if(this._boss.isActive) {
                this._boss.Update();
            }
           this.WinOrLoseCondition();
        }
        
        public Main(): void 
        {
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
            
        }


        public FireGun(enemy:objects.Enemy, bullArray:Array<objects.Image>):void
        {
                    if(enemy.canShoot()){
                        let fire = setInterval(()=>{
                            if(!enemy.isColliding)
                            {
                                let bullet = new objects.Image("beam2", enemy.x, enemy.y + 30, true);
                                bullArray.push(bullet);
                                this.addChild(bullet);
                            }
                            else clearInterval(fire)
                        }, 1000)
                    }
            //});
        }//

        public UpdatePlayerFire() {
            if(config.Game.keyboardManager.fire) {
                if(this.fire) {
                    if(this._scoreBoard.Bullet > 0) {
                        createjs.Sound.play("beamsound");
                        let bullet = new objects.Image("beam", this._supe.x + 48,this._supe.y, true);
                        this._bullets.push(bullet);
                        this.addChild(bullet);
                        this.fire = false;
                        this._scoreBoard.Bullet--;
                    }
                }
            }
            if(!config.Game.keyboardManager.fire) {
                this.fire = true;
            }
            
            if(config.Game.keyboardManager.shield) {
                if(this.shield) 
                {
                    if(this._shield > 0) 
                    {
                        this.playerShield();
                        this._shield--;
                        this.shield = false;
                        createjs.Sound.play("shieldSound");
                    }
                }
            }
            if(!config.Game.keyboardManager.shield) {
                this.shield = true;
            }
            
            if(config.Game.keyboardManager.cheat) {
                if(this.cheat) 
                {
                    this.cheat = false;
                    createjs.Sound.play("power");
                    this._scoreBoard.Lives += 5;
                    this._scoreBoard.Bullet += 10;
                    
                }
            }
            if(!config.Game.keyboardManager.cheat) {
                this.cheat = true;
            }

        }

        public UpdateBullets() {
            this._bullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 10, 10, false);
                managers.Collision.AABBCheck(this._boss, bullet)
                if(bullet.isColliding) {
                    if(this._boss.live > 1) {
                        this._boss.live--;
                        this.BossShieldAnimation(this._boss.x - 130, this._boss.y - 145);
                        createjs.Sound.play("electric")
                        this.removeChild(bullet);
                        bullet.position = new objects.Vector2(-200,-200);
                    } 
                    else 
                    {
                        this._boss.live--;
                        this.ExploreAnimation(this._boss.x, this._boss.y);
                        createjs.Sound.play("smoke");
                        // this._boss.live--;
                    }
                    
                };
            })
           
            this._enemybullets.forEach((bullet)=>{
                this.BulletSpeed(bullet, 10, 10, true);
            })

            if(this._count < 1) {

                this._boss.isActive = true;
            }
            if(this._boss.isActive) {
                if(createjs.Ticker.getTicks() % 60 == 0) {
                    this._random = Math.round(util.Mathf.RandomRange(20, 100));
               }
               
               if(createjs.Ticker.getTicks() %  this._random == 0) {
                   if(!this._boss.isColliding)
                    {
                           let bullet1 = new objects.Image("fire1", this._boss.x+10, this._boss.y - 40, true);
                           this._enemybullets.push(bullet1);
                           createjs.Sound.play("fireSound");
                           this.BulletSpeed(bullet1, 20, 20, true);
                           this.addChild(bullet1);
                        //    this.BeamShooting(this._boss.x, this._boss.y);
                           
                    }
               }
               if(this._boss.live < 8) 
               {
                    if(createjs.Ticker.getTicks() % (this._random * 3) == 0) {
                
                        this.BeamShooting(this._boss.x, this._boss.y);
                    }
               }
              
            }
            
            
        }

        public BulletSpeed(eBullet:objects.Image, eSpeed:number, eMove:number, side:boolean=false):void{
            //enemy direction
            if(side == true)
            {
                eBullet.x -= eSpeed;
                eBullet.position.x -= eMove;
                if(eBullet.x <= 0) {
                    this.removeChild(eBullet);
                } 
            }
            //player direction
            else{
                eBullet.x += eSpeed;
                eBullet.position.x += eMove;
                if(eBullet.y >= 1200) {
                    this.removeChild(eBullet);
                } 
            }
        }

        public UpdatePosition() 
        {
            this._ememies.forEach(enemy => {
                this.addChild(enemy);
                enemy.Update();
                this._enemybullets.forEach((bullet)=>{
                    
                    managers.Collision.AABBCheck(this._supe, bullet);
                    if(bullet.isColliding) {
                        this._scoreBoard.Lives--;
                        createjs.Sound.play("hit")
                        bullet.position = new objects.Vector2(-200,-200);
                        this.removeChild(bullet);
                   
                    }
                });
                this._bullets.forEach((bullet) => {
                    managers.Collision.AABBCheck(enemy, bullet);
                    if(bullet.isColliding) {
                        this.ExploreAnimation(enemy.x, enemy.y);
                        createjs.Sound.play("smoke");
                        this._count--;
                        // this.ExploreAnimation(enemy.x, enemy.y);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        enemy.Dead = true;
                        enemy.position = new objects.Vector2(-100,-200);
                        // enemy.died = true;
                        this.removeChild(enemy);
                        this._scoreBoard.Score += 100;
                        bullet.position = new objects.Vector2(-400,-400);
                        this.removeChild(bullet);
                        // Play.point += 100;
                    }
                    
                });
            this._bossLive.x = this._boss.x + 10;
            this._bossLive.y = this._boss.y - 95;
            this._bossLive.text = this._boss.live.toString();

            });
            
            managers.Collision.AABBCheck(this._supe, this._live);
            if(this._live.isColliding)
            {
                this._live.Reset();
                this._scoreBoard.Bullet++;
                createjs.Sound.play("bulletSound");
            }
        }

        public ExploreAnimation(obX:number, obY:number) {
        
            let SpriteSheet = config.Game.SMOKE_ATLAS;
            let smoke = new createjs.Sprite(SpriteSheet);
            
            smoke.x = obX;
            smoke.y = obY;
            smoke.gotoAndPlay("smoke");
            this.addChild(smoke);
            setTimeout(() => {
                this.removeChild(smoke);
                
            }, 900); 
        }

        public BossShieldAnimation(obX:number, obY:number) {
        
            let SpriteSheet = config.Game.TEXTURE_ATLAS;
            let shield = new createjs.Sprite(SpriteSheet);
            
            shield.x = obX;
            shield.y = obY;
            shield.gotoAndPlay("e1");
            this.addChild(shield);
            setTimeout(() => {
                this.removeChild(shield);
            }, 900); 
        }

        public BeamShooting(obX:number, obY:number)
        {
           
            let bullet1 = new objects.Image("beam3", obX, obY - 100, true);
            this.addChild(bullet1);
            let createBeam = setInterval(()=>{
                this._enemybullets.push(bullet1);
               
                // createjs.Sound.play("./Assets/audio/beam2.wav");
                this.BulletSpeed(bullet1, 30, 30, true);
            }, 500)
            createjs.Sound.play("beam2");
            let bullet2 = new objects.Image("beam3", obX, obY + 100, true);
            this.addChild(bullet2);
            let createBeam2 = setInterval(()=>{
                this._enemybullets.push(bullet2);
                
                // createjs.Sound.play("./Assets/audio/beam2.wav");
                this.BulletSpeed(bullet2, 30, 30, true);
            }, 800)
         
        }

        public playerShield() {    
            this._enemybullets.forEach((bullet) => {
                this.removeChild(bullet);
                bullet.position = new objects.Vector2(-400,-400);
            });
            let SpriteSheet = config.Game.TEXTURE_ATLAS;
            let shield = new createjs.Sprite(SpriteSheet);
            
            shield.x = this._supe.x - 100;
            shield.y = this._supe.y - 200;
            shield.gotoAndPlay("circle1");
            this.addChild(shield);
            setTimeout(() => {
                this.removeChild(shield);
            }, 500); 
        }

        public WinOrLoseCondition()
        {
            if(this._boss.live < 1) {
                config.Game.SCORE += 500 + (50 * config.Game.BULLET) + (100 * config.Game.LIVES);
                
                if(config.Game.SCORE > config.Game.HIGH_SCORE)
                {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
                this.removesound()
                config.Game.SCENE = scenes.State.END;
            }

            if(config.Game.LIVES < 1) {
                if(config.Game.SCORE > config.Game.HIGH_SCORE)
                {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
                this.removesound();
                config.Game.SCENE = scenes.State.END;
            }
        }

        public removesound() {
            this._supe.FlySound.stop();
            if(this._boss.isActive) {
                this._boss.BackgroundSound.stop();
            }
           
        }

    }
}