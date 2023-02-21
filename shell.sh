cd $1

# https to ssh
# https=$(git remote get-url origin | sed 's/^git@\(.*\):\/*\(.*\).git/https:\/\/\1\/\2.git/')
ssh=$(git remote get-url origin | sed 's/^https:\/\/\([^\/]*\)\/\(.*\).git/git@\1\:\2.git/')
git remote set-url origin $ssh
git fetch
author=$(git config user.email)

# count lines
git log $2 --author="$author" --pretty=tformat: --numstat --no-merges --since="1 year ago" -- . ':(exclude)*yarn.lock*' -- . ':(exclude)*package-lock*' -- . ':(exclude)*generated*' -- . ':(exclude)*schemas*' -- . ':(exclude)*pnpm-lock.yaml*' | awk "{ add += \$1; subs += \$2; loc += \$1 - \$2 } END { printf \"$1 ; $2; %s ; %s ; %s\n\", add, subs, loc }"
