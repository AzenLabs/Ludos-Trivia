
export var connectedUsers = {}  // socket id to user data (no email and emeralds)
export var userDataList = {} // email to user data (with emeralds)

export var hostInfo = {
  hostSocket: "",
  phase: 0
};  // current phase of room they in

export var classUsers = {
  "3 Empathy": [],
  "3 Honour": [],
  "3 Diligence": [],
  "3 Resilience": [],
  "3 Integrity": [],
  "3 Harmony": [],
  "3 Respect": [],
  "3 Kindness": []
}

export var classScoreboard = {
  "3 Empathy": {
    "store": 0,
    "students": {
      "john": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
  "3 Honour": {
    "store": 0,
    "students": {
      "john": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
  "3 Diligence": {
    "store": 0,
    "students": {
      "john": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
  "3 Resilience": {
    "store": 0,
    "students": {
      "john": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
  "3 Integrity": {
    "store": 0,
    "students": {
      "john": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
  "3 Harmony": {
    "store": 0,
    "students": {
      "john": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
  "3 Respect": {
    "store": 0,
    "students": {
      "john": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
  "3 Kindness": {
    "store": 0,
    "students": {
      "john": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
}

export var questionsReport = {
  3: []
}


export var quizData = {
  3: {
    "title": "Financial Foundations: Mastering the Money Game",
    "description": "Test your financial savviness and boost your basic money management skills to make informed financial decisions!",
    "qns": [
      {
        "qns": "What is delayed gratification?",
        "options": [
          "Choosing immediate rewards",
          "Waiting for better outcomes in the future",
          "Indulging in instant pleasure",
          "None of the above"
        ],
        "correct": 1,
        "explain": "Add explanation here"
      },
      {
        "qns": "2. Which of the following is an example of instant gratification?",
        "options": [
          "Saving money for a future purchase",
          "Eating a healthy meal",
          "Buying a new video game without considering your budget",
          "All of the above"
        ],
        "correct": 2,
        "explain": "very nice"
      },
      {
        "qns": "3. You have been saving money for months to buy a new bike. However, your favourite gaming console just went on sale. What do you do?",
        "options": [
          "Buy the gaming console now",
          "Wait a little longer and buy the bike as planned",
          "Split the money and get both the gaming console and the bike",
          "Give up on both and save the money for something else"
        ],
        "correct": 1,
        "explain": "very nice"
      }
    ]
  }
  
}

