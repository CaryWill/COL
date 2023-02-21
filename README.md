## Usage

默认从 origin/master 读取代码行数，读取之前会默认执行 git fetch 来保证代码是最新的。

```shell
1. node index.js
```

## TODO 

- [x] Commits authored By me(multiple names maybe).
- [x] Commits commmited 1 year ago.
- [x] Commits commited on multiple branches.(origin/master, trunk-private, origin/trunk-private-1230, trunk-fuwuos3)
- [x] No template, no config file(single config code are small, we can ignore it, and template code are normally authored by author named fed? but lock file can be large)(excludes package-lock.json, yarn.lock... files using git pathspec magic)
- [x] shell args with dynamic authors length, not $3, $4, but iterate over $@(use git config user.email instead)
- [x] nested folder, only first level dir will be searched for now
- [ ] nested folder, but if it contains whitespace, it'll not work right
