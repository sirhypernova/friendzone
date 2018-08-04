const { Canvas } = require('canvas-constructor');
const { Attachment } = require('discord.js');
const fs = require('fs');
const GameView = require('../../classes/gameView.js');

module.exports = {
    async handler(msg,args,fz) {
        msg.delete();
        this.data.gameView = new GameView(0,0,64,this.data.sprites);
        this.data.gameView.setMap('library');
        
        this.data.gameView.offsets = [11,16];
        await this.data.gameView.renderFrame(...this.data.gameView.offsets);
        this.data.gameView.setPlayer('Front');
        await msg.channel.bulkDelete(100).catch(()=>{});
        
        this.data.gameView.message = await msg.channel.send(new Attachment('assets/Title Card Yuuuge.png','game.png'));
    },
    
    async onLoad() {
        this.data.sprites = {
            error: await new Canvas(64,64).setColor('#FF0000').addRect(0,0,64,64).toBufferAsync(),
            't(b)': await new Canvas(64,64).setColor('#000000').addRect(0,0,64,64).toBufferAsync(),
        };
        
        fs.readdir('sprites',(err,files) => {
            if (err) return;
            files.forEach((file) => {
                var name = file.substring(0,file.length - 4);
                fs.readFile('sprites/'+file, (err,data) => {
                    if (err) return;
                    this.data.sprites[name] = data;
                });
            });
        });
    }
}