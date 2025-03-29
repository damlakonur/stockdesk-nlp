# 📈 Stock Desk

**Stock Desk** is an intelligent stock analysis platform that processes financial influencers' tweets to provide stock predictions and insights. The system uses a sophisticated pipeline of 4 different models to analyze tweets and deliver valuable market insights.

---

## 🚀 Pipeline Overview

The system follows a comprehensive pipeline to process and analyze stock-related information:

### 1. **Data Collection**
- Collects tweets from financial influencers
- Fetches real-time and historical stock data from Yahoo Finance
- Stores influencer profiles and stock information in MongoDB

---

### 2. **Model Pipeline (Powered by Hugging Face 🤗)**

Stock Desk uses **four custom fine-tuned models**, all hosted on Hugging Face:

| Model | Purpose | Hugging Face Link |
|-------|---------|-------------------|
| **Model 1: Binary Text Classification** | Filters tweets to identify those containing stock predictions | [prediction-filter-bist30](https://huggingface.co/engibeer/prediction-filter-bist30) |
| **Model 2: Price-Related Named Entity Recognition** | Extracts stock symbols, price targets, support/resistance levels, and time spans | [financial-ner-entities-bist30](https://huggingface.co/engibeer/financial-ner-entities-bist30) |
| **Model 3: Prediction Phrase Extractor (NER)** | Extracts textual prediction phrases from tweets | [prediction-text-ner-bist30](https://huggingface.co/engibeer/prediction-text-ner-bist30) |
| **Model 4: Sentiment Analysis** | Analyzes sentiment of prediction phrases (positive/negative) | [prediction-sentiment-bist30](https://huggingface.co/engibeer/prediction-sentiment-bist30) |

These models are fine-tuned on real-world Turkish finance data and enable automated tweet interpretation.

---

## 🔁 Data Flow

1. **Input Sources**
   - Twitter API for collecting influencer tweets
   - Yahoo Finance API for real-time stock data
   - User interactions through web interface

2. **Processing Steps**
   - Tweet collection and initial filtering
   - Model pipeline processing via Hugging Face Transformers
   - Stock data enrichment
   - Sentiment analysis integration
   - Data storage and updates

3. **Output Generation**
   - Stock predictions with confidence levels
   - Price targets and support/resistance levels
   - Sentiment analysis results
   - Historical prediction accuracy tracking

---

## 🧰 Technology Stack

- **Frontend**: React.js with CoreUI components
- **Backend**: Python Flask
- **Database**: MongoDB
- **Cache**: Redis
- **APIs**: Twitter API, Yahoo Finance
- **ML Models**: BERT-based models via [Hugging Face Transformers](https://huggingface.co/models)

---

## ✨ Features

- Real-time stock data monitoring
- Financial influencer tracking
- Automated tweet analysis
- Stock prediction extraction
- Sentiment analysis
- Historical data analysis
- User-friendly dashboard
- Mobile-responsive design

---

## ⚙️ Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   # Backend
   pip install -r requirements.txt

   # Frontend
   cd frontend
   npm install
