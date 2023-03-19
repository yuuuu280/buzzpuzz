# createImages.pyのmodel.save_pretrained('./model') returnの記述のコメントアウトを外す

# DockerfileのmodelをCOPYしている記述をコメントアウト

docker build -t save-model .

# containerの立ち上げ

cd backend/lambda/createImages

docker exec -it save_model bash

python createImages.py

docker cp save_model:/var/task/model ./backend/lambda/createImages/models
