var folder = "";
if (!cc.sys.isNative)
{
    folder = "res/Art/";
    folder2 = "res/Sounds/";
}


var res = {
    HelloWorld_png : "res/HelloWorld.png",
    Player_png : folder +  "player-hd.png",
    Monster_png : folder + "monster-hd.png",
    Projectile_png : folder + "projectile-hd.png",

    background_mus : folder2 + "background-music.mp3",
    shuriken_mus : folder2 + "shuriken.mp3",
    explosion_mus : folder2 + "explosion.mp3",



};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
