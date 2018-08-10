const { ClientCore } = require('cmd-dj');
const { Client } = ClientCore;

const fz = new Client({
    token: 'NDc0NzYwMjI1NDkzMDkwMzA1.DkkoqA.OH7prpqRkzhLLd3ZFjlIW8YbIYs',
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