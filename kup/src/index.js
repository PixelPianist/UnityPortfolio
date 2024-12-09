const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

yargs(hideBin(process.argv))
    .commandDir('cli-commands')
    .demandCommand(1, "No script command name was specified, check out the README!")
    .completion()
    .recommendCommands()
    .showHelpOnFail(false)
    .help()
    .strictCommands()
    .parse();
