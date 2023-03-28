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

def shuffle(list, num, hole, option):
    # 斜めに移動しない要する
    if ((option == hole + 1) & (option % num == 0)):
        return list
    if ((option == hole - 1) & ((option + 1) % num == 0)):
        return list
    if (option == hole - 1 or
      option == hole - num or
      option == hole + 1 or
      option == hole + num):

    #   パズル入れ替え
        list[hole] += list[option]
        list[option] = list[hole] - list[option]
        list[hole] = list[hole] - list[option]
    
    return list

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
    # アクセストークンの設定
    access_tokens="" # @param {type:"string"}
    # モデルのインスタンス化
    model = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", use_auth_token=access_tokens)
    images=[]
    # clf = pickle.load(open('model.pkl', 'rb'))
    def null_safety(images, **kwargs):
        return images, False
    model.safety_checker = null_safety
    image = model(prompt,num_inference_steps=step)["images"][0]
    img=pil2cv(image)
    h,w=img.shape[:2]
    split_x=3
    split_y=3
    #画像の分割処理
    cx=0
    cy=0
    rand = list(range(num*num))

    for a in range(10000):
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