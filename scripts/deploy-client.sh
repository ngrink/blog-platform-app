echo '[CLIENT]'

cd client
npm run build
cd -

rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./client/build root@ngrink.ru:/srv/www/blog-platform-app/client/
