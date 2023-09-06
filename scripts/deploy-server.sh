echo '[SERVER]'

rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./server/src root@ngrink.ru:/srv/www/blog-platform-app/server/
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./server/.env.* root@ngrink.ru:/srv/www/blog-platform-app/server/
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./server/package*.json root@ngrink.ru:/srv/www/blog-platform-app/server/
