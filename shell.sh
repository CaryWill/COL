cd $1

# https to ssh
# https=$(git remote get-url origin | sed 's/^git@\(.*\):\/*\(.*\).git/https:\/\/\1\/\2.git/')

# 本地所有的仓库都已经执行过一次了
ssh=$(git remote get-url origin | sed 's/^https:\/\/\([^\/]*\)\/\(.*\).git/git@\1\:\2.git/')
git remote set-url origin $ssh
git fetch
author=$(git config user.email)

# count lines
git log $2 --author="$author" --pretty=tformat: --numstat --no-merges --since="1 year ago" -- . ':(exclude)*yarn.lock*' -- . ':(exclude)*package-lock*' -- . ':(exclude)*generated*' -- . ':(exclude)*schemas*' -- . ':(exclude)*pnpm-lock.yaml*' | awk "{ add += \$1; subs += \$2; loc += \$1 - \$2 } END { printf \"$1 ; $2; %s ; %s ; %s\n\", add, subs, loc }"

# 私有化的代码是没有合并到主干的，所以使用 --not 来进行筛选就行了
# git log origin/trunk-private-1230 --not origin/master --author="$author" --no-merges --since="1 year ago" -- . ':(exclude)*yarn.lock*' -- . ':(exclude)*package-lock*' -- . ':(exclude)*generated*' -- . ':(exclude)*schemas*' -- . ':(exclude)*pnpm-lock.yaml*' | awk "{ add += \$1; subs += \$2; loc += \$1 - \$2 } END { printf \"$1 ; $2; %s ; %s ; %s\n\", add, subs, loc }"

