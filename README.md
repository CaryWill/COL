## Usage

默认从 origin/master 读取代码行数，读取之前会默认执行 git fetch 来保证代码是最新的。

1. 替换路径

打开 index.js 文件，替换 const root = "/Users/cary/workspace/gitlab"; 的 root
变量，比如我的仓库全部放在 "/Users/cary/workspace/gitlab" 这个路径下面，然后执行
下面的脚本，它会遍历上面 root 路径下面所有的文件夹然后进行统计，最终生成一个
table.txt 文件。


```shell
node index.js
```

## TODO 

- [x] Commits authored By me(multiple names maybe).
- [x] Commits commmited 1 year ago.
- [x] Commits commited on multiple branches.(origin/master, trunk-private, origin/trunk-private-1230, trunk-fuwuos3)
- [x] No template, no config file(single config code are small, we can ignore it, and template code are normally authored by author named fed? but lock file can be large)(excludes package-lock.json, yarn.lock... files using git pathspec magic)
- [x] shell args with dynamic authors length, not $3, $4, but iterate over $@(use git config user.email instead)
- [x] nested folder, only first level dir will be searched for now
- [x] nested folder, but if it contains whitespace, it'll not work right
- [ ] backup git origin before change incase changed origin is not right
