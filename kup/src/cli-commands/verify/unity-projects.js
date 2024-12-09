module.exports.command = "unity-projects";
module.exports.describe = "Logs out Hello world!";

module.exports.builder = (yargs) => {
    return yargs.usage("Usage: $0 unity-projects");
};

module.exports.handler = async (argv) => {
    console.log("Hello world!");
};
