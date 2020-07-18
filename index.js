const { ClientCore } = require('cmd-dj');
const { Client } = ClientCore;

const fz = new Client({
    token: '',
    prefix: 'f!',
    owners: [
        '225738946661974017'
    ]
},
{
    disableEveryone: true
});

fz.modules.scan('modules');

fz.run().then(() => {
   console.log(`Logged in as ${fz.user.tag}`);
});

// theia test
