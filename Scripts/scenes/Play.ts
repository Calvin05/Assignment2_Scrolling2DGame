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
            this.AddEnemies(5);
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

        }
        
        public Main(): void 
        {
            this.addChild(this._city);
            this.addChild(this._supe);
            this.addChild(this._live);
            // this.addChild(this._enemy);
            
        }


        public FireGun(enemy:objects.Enemy, bullArray:Array<objects.Image>):void
        {
                    if(enemy.canShoot()){
                        let fire = setInterval(()=>{
                            if(!enemy.isColliding)
                            {
                                let bullet = new objects.Image(config.Game.ASSETS.getResult("beam2"), enemy.x, enemy.y, true);
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
                createjs.Sound.play("beamsound");
                let bullet = new objects.Image(config.Game.ASSETS.getResult("beam"), this._supe.x + 48,this._supe.y, true);
                this._bullets.push(bullet);
                this.addChild(bullet);
                this.fire = false;
                }
            }
            if(!config.Game.keyboardManager.fire) {
                this.fire = true;
            }
            
        }

        public UpdateBullets() {
            this._bullets.forEach((bullet) => {
                this.BulletSpeed(bullet, 10, 10, false);
            })
            this._ememies.forEach(enemy => {
                enemy.addEventListener("tick", ()=>{
                
                    if(enemy.canShoot())
                    {
                        let bullet = new objects.Image(config.Game.ASSETS.getResult("beam2"), enemy.x+20, enemy.y+50, true);
                        this._enemybullets.push(bullet);
                        this.addChild(bullet);
                    }
                });
            })
            this._enemybullets.forEach((bullet)=>{
                this.BulletSpeed(bullet, 10, 10, true);
            })
            
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
                this._bullets.forEach((bullet) => {
                    managers.Collision.AABBCheck(enemy, bullet);
                    if(bullet.isColliding) {
                        this.ExploreAnimation(enemy.x, enemy.y);
                        createjs.Sound.play("smoke");
                        // this.ExploreAnimation(enemy.x, enemy.y);
                        // createjs.Sound.play("./Assets/sounds/crash.wav");
                        enemy.position = new objects.Vector2(-100,-200);
                        // enemy.died = true;
                        this.removeChild(enemy);
                        
                        bullet.position = new objects.Vector2(-400,-400);
                        this.removeChild(bullet);
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
            
        }

        public ExploreAnimation(obX:number, obY:number) {
            let chopperImg1 = new Image();
            let chopperImg2 = new Image();
            let chopperImg3 = new Image();
            let chopperImg4 = new Image();
            let chopperImg5 = new Image();
            let chopperImg6 = new Image();
            let chopperImg7 = new Image();
            let chopperImg8 = new Image();
            let chopperImg9 = new Image();
            let chopperImg10 = new Image();
            let chopperImg11 = new Image();
            let chopperImg12 = new Image();
            let chopperImg13 = new Image();
            let chopperImg14 = new Image();
            let chopperImg15 = new Image();
            let chopperImg16 = new Image();
            let chopperImg17 = new Image();
            let chopperImg18 = new Image();
            let chopperImg19 = new Image();
            let chopperImg20 = new Image();
            let chopperImg21 = new Image();
            let chopperImg22 = new Image();
            let chopperImg23 = new Image();
            let chopperImg24 = new Image();
            let chopperImg25 = new Image();
            let chopperImg26 = new Image();
            let chopperImg27 = new Image();
            let chopperImg28 = new Image();
            let chopperImg29 = new Image();
            let chopperImg30 = new Image();
            let chopperImg31 = new Image();

            chopperImg1.src = "./Assets/images/z1.png";
            chopperImg2.src = "./Assets/images/z2.png";
            chopperImg3.src = "./Assets/images/z3.png";
            chopperImg4.src = "./Assets/images/z4.png";
            chopperImg5.src = "./Assets/images/z5.png";
            chopperImg6.src = "./Assets/images/z6.png";
            chopperImg7.src = "./Assets/images/z7.png";
            chopperImg8.src = "./Assets/images/z8.png";
            chopperImg9.src = "./Assets/images/z9.png";
            chopperImg10.src = "./Assets/images/z10.png";
            chopperImg11.src = "./Assets/images/z11.png";
            chopperImg12.src = "./Assets/images/z12.png";
            chopperImg13.src = "./Assets/images/z13.png";
            chopperImg14.src = "./Assets/images/z14.png";
            chopperImg15.src = "./Assets/images/z15.png";
            chopperImg16.src = "./Assets/images/z16.png";
            chopperImg17.src = "./Assets/images/z17.png";
            chopperImg18.src = "./Assets/images/z18.png";
            chopperImg19.src = "./Assets/images/z19.png";
            chopperImg20.src = "./Assets/images/z20.png";
            chopperImg21.src = "./Assets/images/z21.png";
            chopperImg22.src = "./Assets/images/z22.png";
            chopperImg23.src = "./Assets/images/z23.png";
            chopperImg24.src = "./Assets/images/z24.png";
            chopperImg25.src = "./Assets/images/z25.png";
            chopperImg26.src = "./Assets/images/z26.png";
            chopperImg27.src = "./Assets/images/z27.png";
            chopperImg28.src = "./Assets/images/z28.png";
            chopperImg29.src = "./Assets/images/z29.png";
            chopperImg30.src = "./Assets/images/z30.png";
            chopperImg31.src = "./Assets/images/z31.png";


                let spriteSheet = new createjs.SpriteSheet({
                    images: [ chopperImg1, chopperImg2, chopperImg3, chopperImg4, chopperImg5,
                        chopperImg6,chopperImg7, chopperImg8, chopperImg9, chopperImg10, 
                        chopperImg11, chopperImg12, chopperImg13, chopperImg14, chopperImg15, chopperImg16,
                        chopperImg17, chopperImg18, chopperImg19, chopperImg20, chopperImg21,
                        chopperImg22, chopperImg23, chopperImg24, chopperImg25, chopperImg26, chopperImg27,
                        chopperImg28, chopperImg29, chopperImg30, chopperImg31],
                    frames: { width: 200, height: 200, count: 32},
                    animations: {
                        explore: [0, 31, false]
                    }
                });
                let animation = new createjs.Sprite(spriteSheet);
                animation.x = obX-100;
                animation.y = obY-60;
                animation.spriteSheet.getAnimation('explore').speed = 0.8;
                animation.gotoAndPlay('explore');

                this.addChild(animation);
            
        }
    }
}