import redis
import os
import torch
from transformers import BertModel, BertTokenizer

import transformers
from transformers import BertTokenizer
from torch.utils.data import TensorDataset, random_split
from torch.utils.data import DataLoader, RandomSampler, SequentialSampler
from transformers import BertForSequenceClassification, AdamW, BertConfig

import numpy as np

tokenizer = BertTokenizer.from_pretrained(
    'dbmdz/bert-base-turkish-128k-uncased', do_lower_case=True)


def preprocessing(input_text, tokenizer):

    return tokenizer.encode_plus(
        input_text,
        add_special_tokens=True,
        max_length=250,
        pad_to_max_length=True,
        return_attention_mask=True,
        return_tensors='pt',
    )


r = redis.StrictRedis(
    host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), db=0)


model = BertModel.from_pretrained("./model")

new_sentence = 'otokar gitmiyor da vıdı vıdı vıdı vıdı..kimse zarar ettim diyemez ! hadi afiyet olsun..'

# We need Token IDs and Attention Mask for inference on the new sentence
test_ids = []
test_attention_mask = []

# Apply the tokenizer
encoding = preprocessing(new_sentence, tokenizer)

# Extract IDs and Attention Mask
test_ids.append(encoding['input_ids'])
test_attention_mask.append(encoding['attention_mask'])
test_ids = torch.cat(test_ids, dim=0)
test_attention_mask = torch.cat(test_attention_mask, dim=0)
device = torch.device("gpu")
# Forward pass, calculate logit predictions
with torch.no_grad():
    output = model(test_ids.to(device), token_type_ids=None,
                   attention_mask=test_attention_mask.to(device))

    logits = output[0]
print('Input Sentence: ', new_sentence)
print('Predicted Class: ', logits.argmax(dim=1).item())
