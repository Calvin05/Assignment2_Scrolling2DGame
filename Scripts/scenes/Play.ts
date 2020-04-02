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
        private _ememies:objects.Enemy[];
        private _enemybullets: Array<objects.Image>;
        private _live:objects.Live;
        private _boss:objects.Boss;
        private _scoreBoard:managers.ScoreBoard;
        private _random:number = 1000;
        private _count:number = 5;
        private _bossLive:objects.Label;
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
                                let bullet = new objects.Image("beam2", enemy.x, enemy.y, true);
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
            
        }

        public UpdateBullets() {
            this._bullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 10, 10, false);
                managers.Collision.AABBCheck(this._boss, bullet)
                if(bullet.isColliding) {
                    this._boss.live--;
                    this.BossShieldAnimation(this._boss.x - 130, this._boss.y - 145);
                    createjs.Sound.play("./Assets/audio/electric.wav")
                    this.removeChild(bullet);
                    bullet.position = new objects.Vector2(-200,-200);
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
               
               console.log("debug: " +  this._random);
               if(createjs.Ticker.getTicks() %  this._random == 0) {
                   if(!this._boss.isColliding)
                       {
                           let bullet1 = new objects.Image("beam3", this._boss.x+10, this._boss.y - 40, true);
                           this._enemybullets.push(bullet1);
                           this.BulletSpeed(bullet1, 10, 10, true);
                           this.addChild(bullet1);
                          
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
            if(this._live.isColliding)
            {
                this._live.Reset();
                this._scoreBoard.Bullet++;
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
    }
}