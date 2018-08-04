const { watch } = require('fs');

module.exports = {
    events: {
        ready() {
            this.dj.commands.scan('modules/core-commands');
            
            console.log('Core module loaded!');
        }
    }
}