cd /var/app
npm i
npm run build
kill -9 $(lsof -t -i:80)
nohup npm run start > app.log 2>&1 &
