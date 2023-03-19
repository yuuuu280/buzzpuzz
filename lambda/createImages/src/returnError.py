
import json

def Exception(status_code: int, message: str):
    return {
            'statusCode': status_code,
            # 画像の生成をし、Base64エンコードされた画像データのリストをJSON文字列に変換する（メモリ削減のため、ワンライナーで記述）
            'body': json.dumps({"message": message}),
        }