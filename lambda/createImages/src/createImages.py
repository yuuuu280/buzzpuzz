import os
import base64
# import boto3
from diffusers import StableDiffusionPipeline
from pydantic import BaseModel

BUCKET_NAME = "etris-stable-diffusion"


class CreateImageRequest(BaseModel):
    num_images: int
    prompt: str
    negative_prompt: str
    num_inference_steps: int
    path: str
    skip_safety_check: bool

model = StableDiffusionPipeline.from_pretrained("./model")

def create_images(request: CreateImageRequest):
    # モデルのインスタンス化

    # model.save_pretrained('./model')
    # return

    # セーフティチェックをスキップするかどうかの判定
    if request.skip_safety_check:
        def null_safety(images, **kwargs):
            return images, [False]
        model.safety_checker = null_safety

    # 画像生成処理
    image_indexes = []
    # s3 = boto3.client('s3')
    for i in range(request.num_images):
        # モデルにpromptを入力して画像を生成する
        result = model(request.prompt, negative_prompt=request.negative_prompt, num_inference_steps=request.num_inference_steps)

        # 画像生成結果がNSFWなコンテンツではなかった場合
        if not result.nsfw_content_detected[0]:
            output_file_name = f'{request.path}_{i:02}.png'
            save_path = f"/tmp/{output_file_name}"
            result.images[0].save(save_path)
            # S3に画像をアップロードする
            # s3.upload_file(save_path, BUCKET_NAME, output_file_name)
            image_indexes.append(i)

    # S3にアップロードした画像をBase64に変換して返す
    base64_list = []
    for index in image_indexes:
        output_file_name = f'{request.path}_{index:02}.png'
        with open(f"/tmp/{output_file_name}", 'rb') as f:
            data = f.read()
            base64_str = 'data:image/png;base64,' + base64.b64encode(data).decode('utf-8')
            base64_list.append(base64_str)
        os.remove(f"/tmp/{output_file_name}")

    return base64_list

if __name__ == '__main__':
    prompt = "nsfw famale"#"masterpiece, best quality, upper body, 1girl, looking at viewer, red hair, medium hair, purple eyes, demon horns, black coat, indoors, dimly lit"
    nega = ""#"lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts))"#"sailors,boy,bow,bare breasts,straight cut bangs,angry,large breasts,nose blush,purple clothes,off shoulder,apron,vest,nsfw, poor quality, bad face, bad fingers, bad anatomy, missing fingers, low res, retro style cropped, signature, watermark, username, artist name"

    request = CreateImageRequest(
        # model_name="gsdf/Counterfeit-V2.5",
        num_images=1,
        prompt=prompt,
        negative_prompt=nega,
        num_inference_steps=5,
        path="2021",
        skip_safety_check=True,
    )

    create_images(request)
