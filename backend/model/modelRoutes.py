from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
import numpy as np
import yfinance as yf
from transformers import pipeline
import re

model_bp = Blueprint('model_bp', __name__, template_folder='templates')

# Do not forget to change the model and tokenizer paths !
model1_path = "/Users/damlakonur/Desktop/web-dev/backend/model/models/model1/bert-finetuned-bc-bist30"
token1_path = "/Users/damlakonur/Desktop/web-dev/backend/model/models/model1/tokenizer"
model2_path = "/Users/damlakonur/Desktop/web-dev/backend/model/models/model2/bert-finetuned-ner1-bist30"
token2_path = "/Users/damlakonur/Desktop/web-dev/backend/model/models/model2/tokenizer1"
model3_path = "/Users/damlakonur/Desktop/web-dev/backend/model/models/model3/bert-finetuned-ner3-bist30"
token3_path = "/Users/damlakonur/Desktop/web-dev/backend/model/models/model3/tokenizer3"
model4_path = "/Users/damlakonur/Desktop/web-dev/backend/model/models/model4/bert-finetuned-sa-bist30"
token4_path = "/Users/damlakonur/Desktop/web-dev/backend/model/models/model4/tokenizer"
# pipeline initializers
model1 = pipeline("text-classification", model=model1_path, tokenizer=token1_path)
model2 = pipeline("token-classification", model=model2_path, aggregation_strategy="simple",tokenizer=token2_path)
model3 = pipeline("token-classification", model=model3_path, aggregation_strategy="simple", tokenizer=token3_path)
model4 = pipeline("text-classification", model=model4_path, tokenizer=token4_path)

def parseModelOutput(output):
    result = []
    hisse = ''
    hedef = ''
    direnc = ''
    destek = ''
    vade = ''
    tahmin = ''
    for index in range(len(output)):
        for key in output[index]:
            if(output[index][key] == ' Hisse'):
                word = output[index]['word']
                isFound = re.search("^##", word)
                if(isFound):
                    pass
                elif(output[index]['score'] < 0.7):
                    pass
                else:
                    result.append(output[index])
            elif(output[index][key] == ' Hedef'):
                word = output[index]['word']
                isFound = re.search("^##", word)
                if(isFound):
                    pass
                elif(output[index]['score'] < 0.7):
                    pass
                else:
                    result.append(output[index])
            elif(output[index][key] == ' Destek'):
                word = output[index]['word']
                isFound = re.search("^##", word)
                if(isFound):
                    pass
                elif(output[index]['score'] < 0.7):
                    pass
                else:
                    result.append(output[index])
            elif(output[index][key] == ' Direnç'):
                word = output[index]['word']
                isFound = re.search("^##", word)
                if(isFound):
                    pass
                elif(output[index]['score'] < 0.7):
                    pass
                else:
                    result.append(output[index])
            elif(output[index][key] == ' Vade'):
                word = output[index]['word']
                isFound = re.search("^##", word)
                if(isFound):
                    pass
                elif(output[index]['score'] < 0.7):
                    pass
                else:
                    result.append(output[index])
            elif(output[index][key] == ' Tahmin'):
                word = output[index]['word']
                isFound = re.search("^##", word)
                if(isFound):
                    pass
                elif(output[index]['score'] < 0.7):
                    pass
                else:
                    result.append(output[index])
            else: 
                pass

    return result

def jsonize(output):
    for idx in range(len(output)):
        for key in output[idx]:
            output[idx][key] = str(output[idx][key])
    return output
    

@model_bp.route('/model/getResult', methods=["POST"])
def get_prediction():
    tahmin = []
    out = []
    try:
        tweet = request.get_json()['content']
        output1 = model1(tweet)
        print(output1[0]['label'])
        if(output1[0]['label'] == 'LABEL_1'):
            result = 'Gercek'
            status = 'SUCCESS'
            modelOut2 = []
            modelOut3 = []
            modelOut4 = []
        elif(output1[0]['label'] == 'LABEL_0'):
            output2 = model2(tweet)
            parsedOut1 = parseModelOutput(output2)
            parsedOut1 = jsonize(parsedOut1)
            print(parsedOut1)
            output3 = model3(tweet)
            parsedOut2 = parseModelOutput(output3)
            parsedOut2 = jsonize(parsedOut2)
            print(parsedOut2)
            for idx in range(len(parsedOut2)):
                for key in parsedOut2[idx]:
                    if(parsedOut2[idx][key] == ' Tahmin'):
                        tahmin.append(parsedOut2[idx]['word'])
            for i in range(len(tahmin)):
                output4 = model4(tahmin[i])
                out.append(output4[0])
                print(output4)
            result = 'Tahmin'
            status = 'SUCCESS'
            modelOut2 = parsedOut1
            modelOut3 = parsedOut2
            modelOut4 = out
        else:
            result = 'Hata'
            status = 'ERROR'
            modelOut2 = []
            modelOut3 = []
            modelOut4 = []
            
        return json.dumps({'status': status, 'result': result, 'modelOut2': modelOut2, 'modelOut3': modelOut3, 'modelOut4': modelOut4})
    except Exception as e:
        return json.dumps({"error": str(e)})


