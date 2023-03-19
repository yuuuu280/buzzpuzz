# Dockerfileのmodelsの記述をandite-pastelにする
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 551282366752.dkr.ecr.ap-northeast-1.amazonaws.com

docker build -t create-images-andite-pastel .

docker tag create-images-andite-pastel:latest 551282366752.dkr.ecr.ap-northeast-1.amazonaws.com/create-images-andite-pastel:latest

docker push 551282366752.dkr.ecr.ap-northeast-1.amazonaws.com/create-images-andite-pastel:latest




# Dockerfileのmodelsの記述をanythingにする
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 551282366752.dkr.ecr.ap-northeast-1.amazonaws.com

docker build -t create-images-anything .

docker tag create-images-anything:latest 551282366752.dkr.ecr.ap-northeast-1.amazonaws.com/create-images-anything:latest

docker push 551282366752.dkr.ecr.ap-northeast-1.amazonaws.com/create-images-anything:latest


