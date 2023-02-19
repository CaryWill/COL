const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// 填写存放了所有项目仓库的地方
const root = "/Users/cary/Desktop/test";
// const root = "/Users/cary/workspace/gitlab";
const executeShellCommands = (
  cmd,
  options = {
    timeout: 5000,
  }
) => {
  return new Promise((res, rej) => {
    exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        rej(stderr);
      } else {
        res(stdout);
      }
    });
  });
};

const arrs = [];

const main = async () => {
  try {
    const files = await fs.promises.readdir(root);
    for (const file of files) {
      const dirPath = path.join(root, file);
      const stat = await fs.promises.stat(dirPath);
      if (stat.isDirectory()) {
        const gitPath = path.join(dirPath, ".git");
        const isExist = fs.existsSync(gitPath);
        const packageInfoPath = path.join(dirPath, "package.json");
        const isPackageInfoExist = fs.existsSync(packageInfoPath);
        let packageInfo = null;
        if (isPackageInfoExist) {
          try {
            packageInfo = JSON.parse(fs.readFileSync(packageInfoPath));
          } catch (err) {}
        }

        if (isExist) {
          const stat2 = await fs.promises.stat(gitPath);
          if (stat2.isDirectory()) {
            try {
              const output = await executeShellCommands(
                `"./shell.sh" ${gitPath} origin/master cary wangzhangsheng`
              );
              arrs.push(`${packageInfo?.name};${output}`);
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
    }
    fs.writeFileSync("./table.txt", arrs.join(""));
    console.log(arrs.join(""));
  } catch (e) {
    console.error("We've thrown! Whoops!", e);
  }
};

main();
