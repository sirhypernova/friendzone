const { Canvas } = require('canvas-constructor');
const { Attachment } = require('discord.js');

module.exports = class GameView {
    constructor(width,height,size = 50,sprites = {},grid = [],colgrid = []) {
        this.width = width;
        this.height = height;
        this.sprites = sprites;
        this.grid = grid;
        this.colgrid = colgrid;
        this.size = size;
        this.offsets = [0,0];
        this.mapName = '';
        this.message = false;
        this.coll = true;
        
        this.canvas = new Canvas(width*size,height*size);
        this.frame;
    }
    
    setMap(map,x = null,y = null) {
        var mapData = require(`../maps/${map}.js`);
        this.grid = mapData.grid;
        this.colgrid = mapData.colgrid;
        this.width = mapData.width;
        this.height = mapData.height;
        if (x != null && y != null) {
            this.offsets = [x,y];
        } else {
            this.offsets = mapData.offsets;
        }
        this.mapName = map;
    }
    
    renderFrame(startx = 0,starty = 0) {
        return new Promise(async (resolve,reject) => {
            var coords = [0,0];
            
            this.canvas = new Canvas(this.width*this.size,this.height*this.size);
            this.grid.forEach((val,key) => {
                const toAdd = val in this.sprites ? this.sprites[val] : this.sprites['error']
                
                this.canvas.addImage(this.sprites['t(192)'],coords[0],coords[1],this.size,this.size);
                this.canvas.addImage(toAdd,coords[0],coords[1],this.size,this.size);
                if (this.colgrid[key].startsWith('n')) {
                    let data = this.colgrid[key].split('-');
                    var name = data[1];
                    var message = data[2];
                    var sprite = data[3];
                    
                    if (sprite) this.canvas.addImage(this.sprites[`n(${sprite})`],coords[0]-4,coords[1]-(this.size/2),this.size*1.2,this.size*1.2);
                }
                
                if (coords[0] == this.width*this.size - this.size) {
                    coords[0] = 0;
                    coords[1] += this.size;
                } else {
                    coords[0] += this.size;
                }
            });
            
            coords = [0,0]
            
            this.canvas.getImageData(startx*this.size,starty*this.size,this.size*11,this.size*11,async (data) => {
                this.frame = new Canvas(this.size*11,this.size*11);
                this.frame.setColor('#000000').addRect(0,0,this.size*11,this.size*11);
                this.frame.putImageData(data,0,0);
                resolve();
            })
        })
    }
    
    handleMove(x = 0,y = 0) {
        var point = (x+5) + (y+5)*this.width;
        if (!this.coll) return true;
        if (!this.colgrid[point]) return false;
        if (this.colgrid[point] == 't(241)') return true;
        if (this.colgrid[point] == 't(190)') return false;
        if (this.colgrid[point].startsWith('w')) {
            var data = this.colgrid[point].split('-');
            var map = data[1];
            var x = parseInt(data[2]);
            var y = parseInt(data[3]);
            var message = data[4];
            if (message) {
                setTimeout(() => {
                    this.message.channel.send(message);
                },500)
            }
            this.setMap(map,x,y);
            return 'warp';
        }
        if (this.colgrid[point].startsWith('n')) {
            var data = this.colgrid[point].split('-');
            var name = data[1];
            var message = data[2];
            this.message.channel.send(`**${name}:**\n${message}`);
            return false;
        }
        return false;
    }
    
    async getFrame() {
        return await this.frame.toBufferAsync();
    }
    
    setPlayer(sprite = 'error') {
        var playerCoord = this.size*5;
        if ((this.mapName == 'library2' || this.mapName == 'center2') && sprite == 'Front') {
            this.frame.addImage(this.sprites['FrontNo'],playerCoord-(this.size/2),playerCoord-(this.size/1.1)+4,this.size*2,this.size*2);
            return;
        }
        this.frame.addImage(this.sprites[sprite],playerCoord-(this.size/2),playerCoord-(this.size/1.1)+4,this.size*2,this.size*2);
    }
}