module.exports.command = "verify <command>";
module.exports.describe = "Verify repository commands";

module.exports.builder = function(yargs){
    return yargs
        .commandDir('verify')
        .demandCommand(1);
}