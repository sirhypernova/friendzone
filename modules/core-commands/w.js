const { Attachment } = require('discord.js');

module.exports = {
    async handler(msg,args,fz) {
        msg.delete().catch(()=>{});
        var render = fz.commands._commands['start'].data;
        var can = render.gameView.handleMove(render.gameView.offsets[0],render.gameView.offsets[1]-1);
        if (!can) return;
        if (can === true) render.gameView.offsets[1]--;
        await render.gameView.renderFrame(render.gameView.offsets[0],render.gameView.offsets[1]);
        render.gameView.setPlayer('Back');
        
        var channel = render.gameView.message.channel;
        channel.bulkDelete(10).catch(()=>{});
        render.gameView.message = await channel.send(new Attachment(await render.gameView.getFrame(),'render.png'));
    },
}