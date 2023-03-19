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

def Base64ToNdarry(img_base64):
    img_data = base64.b64decode(img_base64)
    img_np = np.fromstring(img_data, np.uint8)
    src = cv2.imdecode(img_np, cv2.IMREAD_ANYCOLOR)

    return src

def pil2cv(image):
    ''' PIL型 -> OpenCV型 '''
    new_image = np.array(image, dtype=np.uint8)
    if new_image.ndim == 2:  # モノクロ
        pass
    elif new_image.shape[2] == 3:  # カラー
        new_image = cv2.cvtColor(new_image, cv2.COLOR_RGB2BGR)
    elif new_image.shape[2] == 4:  # 透過
        new_image = cv2.cvtColor(new_image, cv2.COLOR_RGBA2BGRA)
    return new_image
    
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



@app.get("/ai/{num_str}/{step_str}/{prompt}")
async def hello(num_str, prompt, step_str):
    step=int(step_str)
    num = int(num_str)
    if(num>10):
        return{
        "original": "",
        "images": "",
        "hole": "",
        "answer": ""
        }
    #画像の読み込み
    url = 'https://awvfhonb66dxnj4xe62ufvybby0smiiv.lambda-url.ap-northeast-1.on.aws/'
    res = requests.post(url, json={'imgNum': 1, 'prompt': prompt, 'negativePrompt': "", 'step':step, "skipSafetyChecker": True})
    data = res.json()[0]
    img_data = base64.b64decode(data.replace("data:image/png;base64,",""))
    img_np = np.fromstring(img_data, np.uint8)
    img = cv2.imdecode(img_np, cv2.IMREAD_ANYCOLOR)
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