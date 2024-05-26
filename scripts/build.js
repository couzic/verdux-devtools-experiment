const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

// Clean the build folder
const buildFolder = path.join(__dirname, "/../build");
fs.rmSync(buildFolder, { recursive: true, force: true });
fs.mkdirSync(buildFolder);

console.log("Building panel...");
const panelFolder = path.join(__dirname, "/../panel");
execSync("npm run build", { cwd: panelFolder });

// Copy /panel/dist to build folder
fs.cpSync(path.join(panelFolder, "dist"), buildFolder, {
  recursive: true,
});

// Copy /scaffold to build folder
fs.cpSync(path.join(__dirname, "/../scaffold"), buildFolder, {
  recursive: true,
});
