const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// 填写存放了所有项目仓库的地方
const root = "/Users/cary/Desktop/test";
// const root = "/Users/cary/workspace/gitlab";
const executeShellCommands = (cmd, options = {}) => {
  return new Promise((res, rej) => {
    exec(
      cmd,
      {
        timeout: 10000,
        ...options,
      },
      (err, stdout, stderr) => {
        if (err) {
          rej(stderr);
        } else {
          res(stdout);
        }
      }
    );
  });
};

const getData = async (branch = "master") => {
  const arrs = [];
  const files = await fs.promises.readdir(root);
  return new Promise(async (resolve) => {
    for (const file of files) {
      try {
        const dirPath = path.join(root, file);
        const stat = await fs.promises.stat(dirPath);
        if (!stat.isDirectory()) continue;
        const gitPath = path.join(dirPath, ".git");
        const packageInfoPath = path.join(dirPath, "package.json");
        if (!fs.existsSync(packageInfoPath)) continue;
        const packageInfo = JSON.parse(fs.readFileSync(packageInfoPath));
        const stat2 = await fs.promises.stat(gitPath);
        if (!(fs.existsSync(gitPath) && stat2.isDirectory())) continue;
        const output = await executeShellCommands(
          `"./shell.sh" ${dirPath} ${branch}`
        );
        console.log(packageInfo?.name, branch, output);
        arrs.push(`${packageInfo?.name};${output}`);
      } catch (e) {
        console.log(e);
      }
    }
    resolve(arrs);
  });
};

const main = async () => {
  // 填写分支, 默认 origin/master
  const master = await getData("origin/master");
  fs.writeFileSync("./table.txt", master.join(""));
};

try {
  main();
} catch (e) {
  console.error("妈的挂了... ", e);
}
