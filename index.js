const { ClientCore } = require('cmd-dj');
const { Client } = ClientCore;

const fz = new Client({
    token: 'NDc0NzYwMjI1NDkzMDkwMzA1.DkVLSQ.p9ku261_wzmEHHoP3yhkMUVQV3E',
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