var folder = "";
if (!cc.sys.isNative)
{
    folder = "res/Art/";
}


var res = {
    HelloWorld_png : "res/HelloWorld.png",
    Player_png : folder +  "player-hd.png",
    Monster_png : folder + "monster-hd.png",
    Projectile_png : folder + "projectile-hd.png",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
