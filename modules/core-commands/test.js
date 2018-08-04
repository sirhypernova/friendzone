const { Attachment } = require('discord.js');

module.exports = {
    // async handler(msg,args,fz) {
    //     msg.delete();
    //     var render = fz.commands._commands['start'].data;
    //     render.gameView.setMap('end');
        
    //     await render.gameView.renderFrame(render.gameView.offsets[0],render.gameView.offsets[1]);
    //     render.gameView.setPlayer('Front');
        
    //     var channel = render.gameView.message.channel;
    //     channel.bulkDelete(10).catch(()=>{});
    //     render.gameView.message = await channel.send(new Attachment(await render.gameView.getFrame(),'render.png'));
    // },
    handler(){}
}