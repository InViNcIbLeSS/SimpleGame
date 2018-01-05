var Settings = cc.Layer.extend({

	ctor:function(){
		this._super();
		var size = cc.winSize;	
		cc.director	.setClearColor(cc.color(255,0,0,0,0));
		var menuItem1 = new cc.MenuItemFont("Mute Sound", mute);
		var menuItem2 = new cc.MenuItemFont("Settings", settings);
        var menuItem2 = new cc.MenuItemFont("Exit", exit);

        var menu = new cc.Menu(menuItem1, menuItem2);
        menu.alignItemsVertically();
        this.addChild(menu);

	}
});
var SettingsScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new Settings();
		this.addChild(layer);
	}


});
