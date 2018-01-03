

var obj;
var MainLayer = cc.Layer.extend({
    sprite:null,
   // monsters: [],
    ctor:function(){
        this._super();

        var size = cc.winSize;
        cc.director.setClearColor(cc.color(255,255,255,255));

        var player = new cc.Sprite.create(res.Player_png);
        player.setPosition(cc.p(player.getContentSize().width / 2, size.height / 2));
        obj = this;
        this.addChild(player);
        this.schedule(this.addMonster, 3);

        if(cc.sys.capabilities.hasOwnProperty('mouse'))
        {
            var size = cc.winSize;
            var location = cc.p(size.width / 2, size.height / 2);
            cc.eventManager.addListener({

            event: cc.EventListener.MOUSE,
            onMouseUp:function(event)  
            {
                location = cc.p(event.getLocationX(), event.getLocationY());
                var size = cc.winSize;
                var projectile = new cc.Sprite.create(res.Projectile_png);
                projectile.setPosition(cc.p(0, size.height / 2));
                obj.addChild(projectile);
                locationTap(location, projectile);
            }
        }, this);
        }
    },
    addMonster:function(dt){

      //  cc.log("hello");

        var monster = new cc.Sprite.create(res.Monster_png);
        var size = cc.winSize;    

        var minY = size.height / 2;
        var maxY = size.height - size.height / 2;

        var range = maxY - minY;
        var actualY = (Math.random() *size.height) ;

        monster.setPosition(size.width + monster.getContentSize().width / 2 , actualY);
       // cc.log("here");
        this.addChild(monster);
       // cc.log("here2");
        var minTime = 2;
        var maxTime = 4;
        var timeRange = maxTime - minTime;
        var actualTime = (Math.random() * timeRange) + minTime;

        var actionMove = cc.MoveTo.create(actualTime, cc.p(-size.width / 2, actualY));
       // cc.log("here3");

        // var afterMoveDone = cc.callFunc.create(function(node){
        //     cc.ArrayRemoveObject(this.mosters, node);
        //     node.removeFromParent();
        // }, this);
        monster.runAction(actionMove);
       // cc.log("here4");

        // monster.setTag(1);
        // this.monsters.push(monster);
    },
});

var locationTap = function(location,projectile){
        var size = cc.winSize;
        var offset = cc.pSub(location, projectile.getPosition());
        // cc.log("Projectile");
        // cc.log(projectile.getPosition());
        // cc.log("location is");
        // cc.log(location);
        // cc.log("Offset is ");
        // cc.log(offset);
        if(location.x <= 0)
            return;
        var tempx = location.x;
        var tempy = location.y;

        if((tempy - 320 - (tempx / 3)) < 0 && (tempy - 320 + (tempx / 3)) > 0){
            var realX = size.width;
            realY = 320 + ((tempy - 320)*(realX - 0)/(tempx - 0))
            var dest = cc.p(realX,realY);
        }
        else if((tempy - 320 - (tempx / 3)) > 0 ){
            var realY = size.height;
            var realX = ((realY - 320)*(tempx - 0)/(tempy - 320)) + 0 
            var dest = cc.p(realX,realY);
        }
        else if((tempy - 320 + (tempx / 3)) < 0 ){
            var realY = 0;
            var realX = ((realY - 320)*(tempx - 0)/(tempy - 320)) + 0 
            var dest = cc.p(realX,realY);
        }
        //cc.log("Destination");
        //cc.log(dest)
        var offset = cc.pSub(dest, projectile.getPosition());
        var length = cc.pLength(offset);
        var velocity = 500;
        var duration = length / velocity;
        //cc.log("hello");
        projectile.runAction(cc.MoveTo.create(duration, dest));
        cc.log("_-------------------------------------------_");

}
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();       
        this.addChild(layer);
    }
});


//y - y1 = (y2 - y1)*(x - x1)/(x2 - x1)


// y = (x/ 3) + 320; (960,640)
// y = -(x/ 3) + 320; (960,640)