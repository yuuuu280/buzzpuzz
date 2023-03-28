APIの操作方法
・main.pyがあるフォルダに移動
・python3 -m uvicorn main:app --reload
※python, unicorn等のインストールが必要

ec2でstart_server.shでエラーが出た場合
sudo su -
nvm install v16.19.1
sh /var/app/scripts/start_server.sh