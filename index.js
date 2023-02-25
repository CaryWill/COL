const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// 填写存放了所有项目仓库的地方
// const root = "/Users/cary/Desktop/test";
const root = "/Users/cary/workspace/gitlab";
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

const getData = async (branch = "origin/master", arrs = [], dir = root) => {
  const files = await fs.promises.readdir(dir);
  return new Promise(async (resolve) => {
    for (const file of files) {
      try {
        const dirPath = path.join(dir, file);
        const stat = await fs.promises.stat(dirPath);
        if (!stat.isDirectory()) continue;
        const gitPath = path.join(dirPath, ".git/");
        if (fs.existsSync(gitPath)) {
          if (dirPath.includes(" ")) {
            console.log("暂时不支持文件夹名带空格的");
            continue;
          }
          const output = await executeShellCommands(
            `"./shell.sh" ${dirPath} ${branch}`
          );
          const packageInfoPath = path.join(dirPath, "package.json");
          let packageInfo = { name: "err" };
          try {
            packageInfo = fs.existsSync(packageInfoPath)
              ? JSON.parse(fs.readFileSync(packageInfoPath))
              : {};
          } catch (e) {}
          console.log(packageInfo?.name, branch, output);
          arrs.push(`${packageInfo?.name};${dirPath};${output}`);
        } else {
          const nested = await getData(branch, arrs, dirPath);
          arrs.concat(nested);
        }
      } catch (e) {
        console.log(e);
      }
    }
    resolve(arrs);
  });
};

const main = async () => {
  // 填写分支, 默认 origin/master
  const branch = "origin/master";
  // const branch = "origin/trunk-private-1230";
  const master = await getData(branch, [], root);
  fs.writeFileSync("./table.txt", master.join(""));
};

try {
  main();
} catch (e) {
  console.error("妈的挂了... ", e);
}
