

var GameOver = cc.Layer.extend({
	sprite: null,

	ctor:function(){
		this._super();
		var size = cc.winSize;	
		cc.director	.setClearColor(cc.color(255,0,0,0,0));
			var menuItem1 = new cc.MenuItemFont("Play Again", play);
	        var menuItem2 = new cc.MenuItemFont("Exit", exit);

	        var menu = new cc.Menu(menuItem1, menuItem2);
	        menu.alignItemsVertically();
	        this.addChild(menu);
	}
});
var play = function(){
	//cc.director.popScene();
	var scene = new MainLayerScene();
	cc.director.runScene(scene);
}
var exit = function(){

	var scene = new GameOverScene();
	cc.director.runScene(scene);
	
}
var GameOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameOver();       
        this.addChild(layer);
    }
});