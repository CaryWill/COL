cd $1

# https to ssh
# https=$(git remote get-url origin | sed 's/^git@\(.*\):\/*\(.*\).git/https:\/\/\1\/\2.git/')
ssh=$(git remote get-url origin | sed 's/^https:\/\/\([^\/]*\)\/\(.*\).git/git@\1\:\2.git/')
git remote set-url origin $ssh

# count lines
git log $2 --author="\($3\|$4\)" --pretty=tformat: --numstat --no-merges --since="1 year ago" -- . ':(exclude)*yarn.lock*' -- . ':(exclude)*package-lock*' -- . ':(exclude)*generated*' -- . ':(exclude)*schemas*' | awk "{ add += \$1; subs += \$2; loc += \$1 - \$2 } END { printf \"%s %s %s\n\", add, subs, loc }"
