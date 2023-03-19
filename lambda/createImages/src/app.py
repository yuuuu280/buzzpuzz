import datetime
import random
import json
from createImages import create_images, CreateImageRequest
from returnError import Exception

BUCKET_NAME = "etris-stable-diffusion"
MODEL_PATH = "./model"
MAX_IMAGES_PER_REQUEST = 5
MAX_TOTAL_IMAGES = 150

def lambda_handler(event, context):
    reqBody = json.loads(event["body"])
    img_num = reqBody["imgNum"]
    prompt = reqBody["prompt"]
    negativePrompt = reqBody.get("negativePrompt", "")
    step = reqBody["step"]
    skip_safety_check = reqBody.get("skipSafetyChecker", True)

    if img_num > MAX_IMAGES_PER_REQUEST:
        return Exception(400, "一度に生成できる最大画像数は5枚です")
    if (step * img_num) > MAX_TOTAL_IMAGES:
        return Exception(400, "一度に指定できる画像枚数×stepは150を超えれません")

    # 日付からランダムなidを生成
    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9), 'JST'))
    id = now.strftime('%Y%m%d%H%M%S') + (''.join([chr(random.randint(97, 122)) for _ in range(5)]))

    request = CreateImageRequest(
        # model_name=MODEL_PATH,
        num_images=img_num,
        prompt=prompt,
        negative_prompt=negativePrompt,
        num_inference_steps=step,
        path=id,
        skip_safety_check=skip_safety_check,
    )

    try:
        return {
            'statusCode': 200,
            # 画像の生成をし、Base64エンコードされた画像データのリストをJSON文字列に変換する（メモリ削減のため、ワンライナーで記述）
            'body': json.dumps(create_images(request)),
        }
    except:
        return Exception(500, "画像の生成に失敗しました、管理者にお問合せください。")
