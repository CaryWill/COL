# # echo $1
# ssh2http -hs
# git --git-dir=$1 stash
# git --git-dir=$1 checkout master 
# git --git-dir=$1 pull 
# git --git-dir=$1 fetch 

# count lines
git --git-dir=$1 log $2 --author="\($3\|$4\)" --pretty=tformat: --numstat --no-merges --since="1 year ago" | awk "{ add += \$1; subs += \$2; loc += \$1 - \$2 } END { printf \"%s; %s; %s\n\", add, subs, loc }"
