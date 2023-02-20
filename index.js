const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { resolve } = require("path");

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

const getData = async (branch = "master", authors = "") => {
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
        if (!fs.existsSync(gitPath)) continue;
        const stat2 = await fs.promises.stat(gitPath);
        if (!stat2.isDirectory()) continue;
        const _authors = authors.split("|").join(" ");
        const output = await executeShellCommands(
          `"./shell.sh" ${dirPath} ${branch} ${_authors}`
        );
        console.log(packageInfo?.name, branch, output);
        arrs.push(`${packageInfo?.name} ${output}`);
      } catch (e) {
        console.log(e);
      }
    }
    resolve(arrs);
  });
};

const main = async () => {
  const master = await getData("origin/master", "cary|wangzhangsheng");
  // const private = await getData("origin/trunk-private", "cary|wangzhangsheng");
  fs.writeFileSync("./table.txt", [...master].join(""));
};

try {
  main();
} catch (e) {
  console.error("We've thrown! Whoops!", e);
}
