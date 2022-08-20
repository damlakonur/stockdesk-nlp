from flask import Blueprint, current_app, request
import json
from bson.json_util import dumps
import numpy as np
import yfinance as yf
from transformers import pipeline
import re
import datetime
import time

model_bp = Blueprint('model_bp', __name__, template_folder='templates')

look_up = {
    "AKBNK.IS" : ["#akbnk", "akbnk", "#akbank", "akbank"],
    "ARCLK.IS" : ["#arclk", "arclk", "#arcelik", "arcelik"],
    "ASELS.IS" : ["#asels", "asels", "aselsan"],
    "BIMAS.IS" : ["#bimas", "bimas"],
    "EKGYO.IS" : ["#ekgyo", "ekgyo"],
    "EREGL.IS" : ["#eregl", "eregl", "#eregli", "eregli"],
    "FROTO.IS" : ["#froto", "froto"],
    "GARAN.IS" : ["#garan", "garan", "#garanti", "garanti", "garantibankasi",
                "#garanbnk" "garanbnk", "#garantibnk", "garantibnk", 
                "#garantibank", "garantibank"],
    "GUBRF.IS" : ["#gubrf", "gubrf"],
    "HALKB.IS" : ["#halkb", "halkb", "#halkbnk", "halkbnk", "#halkbank", "halkbank","halkbankasi"],
    "HEKTS.IS" : ["#hekts", "hekts", "#hektas", "hektas"],
    "ISCTR.IS" : ["#isctr", "isctr", "#isbank", "isbank", "#isbnk", "isbnk", "isbankasi"],
    "KCHOL.IS" : ["#kchol", "kchol", "koc holding"],
    "KOZAA.IS" : ["#kozaa", "kozaa"],
    "KOZAL.IS" : ["#kozal", "kozal"],
    "KRDMD.IS" : ["#krdmd", "krdmd", "kardemir"],
    "PETKM.IS" : ["#petkm", "petkm", "#petkim", "petkim"],
    "PGSUS.IS" : ["#pgsus", "pgsus", "#pegasus", "pegasus"],
    "SAHOL.IS" : ["#sahol", "sahol", "Sabancı Holding"],
    "SASA.IS"  : ["#sasa", "sasa"],
    "SISE.IS"  : ["#sise", "sise", "#sisecam", "sisecam", "sise cam"],
    "TAVHL.IS" : ["#tavhl", "tavhl", "#tavh", "tavh"],
    "TCELL.IS" : ["#tcell", "tcell", "#turkcell", "turkcell"],
    "THYAO.IS" : ["#thyao", "thyao"],
    "TKFEN.IS" : ["#tkfen", "tkfen", "#tekfen", "tekfen"],
    "TOASO.IS" : ["#toaso", "toaso", "#tofas", "tofas"],
    "TTKOM.IS" : ["#ttkom", "ttkom", "#turktelekom", "turktelekom"],
    "TUPRS.IS" : ["#tuprs", "tuprs", "#tupras", "tupras"],
    "VESTL.IS" : ["#vestl", "vestl", "#vestel", "vestel"],
    "YKBNK.IS" : ["#ykbnk", "ykbnk", "#yapikredi", "yapikredi"],
    "XU100.IS":["#bist100", "bist100", "#xu100", "xu100", "#endeks", "endeks", "xu100'"],
    "XU030.IS": ["#bist30", "bist30", "#xu030", "xu030", "#xu30", "xu30"],
    "XBANK.IS" : ["#xbank", "xbank"]
}

tr2eng_dict = {
    'Ç':'c',
    'ç':'c',
    'Ğ':'g',
    'ğ':'g',
    'İ':'i',
    'i':'i',
    'Ö':'o',
    'ö':'o',
    'Ş':'s',
    'ş':'s',
    'Ü':'u',
    'ü':'u'
}
def asciify_and_lower(word):
    for letter in word:
        if(letter in tr2eng_dict.keys()):
            word = word.replace(letter, tr2eng_dict[letter])

    return word.lower()

        
def change_entity_group_for_hisse(word):
    result = ''
    list =[]

    result = asciify_and_lower(word.strip().replace(" ", "").replace("#", ""))
    for key, value in look_up.items():
        if result in value:
            result = key
            break
    list.append(result)
    return list
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

def getTimeArgs(tweetDate):
    start_date = tweetDate[:-4]
    start_date = time.strftime('%Y-%m-%d %H:%M:%S', time.strptime(start_date,'%a, %d %b %Y %H:%M:%S'))
    start_date = start_date[:-9]
    print(start_date)
    startDt = datetime.datetime.strptime(start_date,'%Y-%m-%d').date()
    startDt = datetime.datetime.combine(startDt, datetime.time(0, 0))
    today = datetime.datetime.today().strftime('%Y-%m-%d')
    todayDt = datetime.datetime.today()
    bool = startDt < todayDt
    print(bool)
    print(today)
    print(start_date)
    return start_date, today, bool

    

@model_bp.route('/model/getResult', methods=["POST"])
def get_prediction():
    tahmin = []
    out = []
    yahooStock = []
    stocks = []
    try:
        content = request.get_json()['content']
        tweet =content['content']
        start_date = content['date']
        
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
            for i in range(len(parsedOut1)):
                for key in parsedOut1[i]:
                    if(parsedOut1[i][key] == ' Hisse'):
                        yahooStock = change_entity_group_for_hisse(parsedOut1[i]['word'])
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
        start_date, today, flag = getTimeArgs(start_date)
        print(today)
        print(start_date)
        if(flag and len(yahooStock) > 0):
            
            ticker = yf.Ticker(yahooStock[0])
            data = ticker.history(start=start_date, end=today, interval='1d')
            for i in range(len(data)):
                stock = {}
                stock['x'] = str(data.iloc[i].name)
                stock['y'] = [round(data["Open"].values[i], 2),round(data["High"].values[i],2),round(data["Low"].values[i], 2),round(data["Close"].values[i], 2)]
                stocks.append(stock)

        elif(flag == False and len(yahooStock) > 0):
            for i in range(len(yahooStock)):
                ticker = yf.Ticker(yahooStock[i])
                data = ticker.history(period="min")
                stock = {}
                stock['x'] = str(data.iloc[i].name)
                stock['y'] = [round(data["Open"].values[i], 2),round(data["High"].values[i],2),round(data["Low"].values[i], 2),round(data["Close"].values[i], 2)]
                stocks.append(stock)
        else:
            pass


            
        return json.dumps({'status': status, 'result': result, 'modelOut2': modelOut2, 'modelOut3': modelOut3, 'modelOut4': modelOut4, 'yahooStock': yahooStock, 'predStock': stocks})
    except Exception as e:
        return json.dumps({"error": str(e)})


