cd $1

# https to ssh
# https=$(git remote get-url origin | sed 's/^git@\(.*\):\/*\(.*\).git/https:\/\/\1\/\2.git/')

# 本地所有的仓库都已经执行过一次了
ssh=$(git remote get-url origin | sed 's/^https:\/\/\([^\/]*\)\/\(.*\).git/git@\1\:\2.git/')
git remote set-url origin $ssh
git fetch
author=$(git config user.email)

grep -hroE --exclude-dir={node_modules,.git,.node} --exclude={*lock*,*tmp*} '<img[^>]*src="[^"]*"' "$1/"
