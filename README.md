# Stock Desk

Stock Desk is an intelligent stock analysis platform that processes financial influencers' tweets to provide stock predictions and insights. The system uses a sophisticated pipeline of 4 different models to analyze tweets and provide valuable market insights.

## Pipeline Overview

The system follows a comprehensive pipeline to process and analyze stock-related information:

1. **Data Collection**
   - Collects tweets from financial influencers
   - Fetches real-time and historical stock data from Yahoo Finance
   - Stores influencer profiles and stock information in MongoDB

2. **Model Pipeline**

The system employs 4 specialized models:

### Model 1: Binary Text Classification
- Purpose: Filters tweets to identify those containing stock predictions
- Input: Raw tweet text
- Output: Binary classification (prediction/non-prediction)
- Model Type: BERT-based fine-tuned classifier

### Model 2: Price-Related Named Entity Recognition
- Purpose: Extracts stock symbols and price-related information
- Input: Filtered tweets
- Output: Identified entities including:
  - Stock symbols
  - Target prices
  - Support/resistance levels
  - Time spans for predictions

### Model 3: Comment-Related Named Entity Recognition
- Purpose: Extracts contextual information from tweet comments
- Input: Tweet text and comments
- Output: Relevant entities and context from comments

### Model 4: Sentiment Analysis
- Purpose: Analyzes the sentiment of predictions and comments
- Input: Processed tweet text and comments
- Output: Sentiment classification (positive/negative/neutral)

## Data Flow

1. **Input Sources**
   - Twitter API for collecting influencer tweets
   - Yahoo Finance API for real-time stock data
   - User interactions through web interface

2. **Processing Steps**
   - Tweet collection and initial filtering
   - Model pipeline processing
   - Stock data enrichment
   - Sentiment analysis integration
   - Data storage and updates

3. **Output Generation**
   - Stock predictions with confidence levels
   - Price targets and support/resistance levels
   - Sentiment analysis results
   - Historical prediction accuracy tracking

## Technology Stack

- **Frontend**: React.js with CoreUI components
- **Backend**: Python Flask
- **Database**: MongoDB
- **Cache**: Redis
- **APIs**: Twitter API, Yahoo Finance
- **ML Models**: BERT-based models (Hugging Face Transformers)

## Features

- Real-time stock data monitoring
- Financial influencer tracking
- Automated tweet analysis
- Stock prediction extraction
- Sentiment analysis
- Historical data analysis
- User-friendly dashboard
- Mobile-responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   pip install -r requirements.txt
   
   # Frontend
   cd frontend
   npm install
   ```

3. Set up environment variables:
   - Create `.env` file in root directory for backend configuration
   - Create `.env` file in frontend directory for frontend configuration

4. Start the services:
   ```bash
   # Start MongoDB and Redis
   docker-compose up -d

   # Start Backend
   python server.py

   # Start Frontend
   cd frontend
   npm start
   ```

## Environment Variables

### Backend
```
ENVIRONMENT="DEV"
MONGO_HOST="localhost"
MONGO_PORT=27017
MONGO_USERNAME="web"
MONGO_PASSWORD="web"
MONGO_DB="web"
SERVER_PORT="5001"
SERVER_HOST="0.0.0.0"
TWITTER_CONSUMER_KEY="your_key"
TWITTER_CONSUMER_SECRET="your_secret"
TWITTER_ACCESS_TOKEN="your_token"
TWITTER_ACCESS_TOKEN_SECRET="your_token_secret"
```

### Frontend
```
PORT=3000
REACT_APP_API_BASE_URL="http://localhost:5001"
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.