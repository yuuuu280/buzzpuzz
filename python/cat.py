import cv2
import numpy as np
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware # 追加
import base64
import random
import requests
import json
import numpy as np

def cv_to_base64(img):
    _, encoded = cv2.imencode(".jpg", img)
    img_str = base64.b64encode(encoded).decode("ascii")

    return img_str
def shuffle(ansList, num, hole, option):
    hole=ansList.index(num*num-1)
    # 斜めに移動しない要する
    if ((option == hole + 1) and (option % num == 0)):
        return ansList
    if ((option == hole - 1) and ((option + 1) % num == 0)):
        return ansList
    if (
        option == hole - 1 or
      option == (hole - num) or
      option == hole + 1 or
      option == (hole + num)
      ):

    #   パズル入れ替え
        swap = ansList[option]
        ansList[option] = ansList[hole]
        ansList[hole] = swap

    return ansList
    # ansList=[0,2,1,3]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)



@app.get("/cat/{num_str}")
async def hello(num_str):
    num = int(num_str)
    if(num>10):
        return{
        "original": "",
        "images": "",
        "hole": "",
        "answer": ""
        }
    #画像の読み込み
    url = 'https://api.thecatapi.com/v1/images/search'
    res = requests.get(url)
    data = json.loads(res.text)
    url = data[0]['url']
    response = requests.get(url)
    arr = np.frombuffer(response.content, dtype=np.uint8)
    img = cv2.imdecode(arr, flags=cv2.IMREAD_COLOR)
    # img = Image.open("filename")
    h,w=img.shape[:2]
    images=[]
    #n*nの計算
    split_x=num
    split_y=num
    #画像の分割処理
    cx=0
    cy=0
    rand = list(range(num*num))

    for a in range(1000):
        rand = shuffle(rand, num, rand.index(num*num-1), random.randint(0,num*num-1))
    # rand = shuffle(rand, rand.index(15), 14)
    
    
    print("fi:")
    print(rand)

    for j in range(split_y):
        for i in range(split_x):
            split_pic=img[cy:cy+int(h/split_y),cx:cx+int(w/split_x),:]
            # cv2.imwrite('split_pic/split_y'+str(i)+'_x'+str(j)+'.jpg',split_pic)
            img_str = cv_to_base64(split_pic)
            images.append('data:image/png;base64,'+img_str)
            cx=cx+int(w/split_x)
        cx=0
        cy=cy+int(h/split_y)

    images[num*num-1]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P4////fwAJ+wP9BUNFygAAAABJRU5ErkJggg=="
    hole = rand.index(num*num-1)

    return  {
        "original": 'data:image/png;base64,'+cv_to_base64(img),
        "images": images,
        "hole": hole,
        "answer": rand
}