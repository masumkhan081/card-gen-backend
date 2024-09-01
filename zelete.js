const dt = require("./zelete.json");

function main() {
  if (dt.name == "ValidationError")
    console.log(dt._message + ": (" + Object.keys(dt.errors).join(",") + ")");
}

main();
