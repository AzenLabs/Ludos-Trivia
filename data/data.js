
export var connectedUsers = {}  // socket id to user data (no email and emeralds)
export var userDataList = {} // email to user data (with emeralds)

export var hostInfo = {
  hostSocket: "",
  phase: 0
};  // current phase of room they in

export var classScoreboard = {
  "3 Empathy": {
    "store": 0,
    "students": {
      // name: emeralds
    }
  },
  "3 Honour": {
    "store": 0,
    "students": {
      "kw": 200,
      "bruh": 100,
      "lmao": 0,
      "oi": 800,
      "nani": 600
    }
  },
  "3 Diligence": {
    "store": 0,
    "students": {
      // name: emeralds
    }
  },
  "3 Resilience": {
    "store": 0,
    "students": {
      // name: emeralds
    }
  },
  "3 Integrity": {
    "store": 0,
    "students": {
      // name: emeralds
    }
  },
  "3 Harmony": {
    "store": 0,
    "students": {
      // name: emeralds
    }
  },
  "3 Respect": {
    "store": 0,
    "students": {
      // name: emeralds
    }
  },
  "3 Kindness": {
    "store": 0,
    "students": {
      // name: emeralds
    }
  },
}

export var questionsReport = {
  2: []
}


export var quizData = {
  2: {
    "title": "Very poggers lmao",
    "description": "this is a very bruh description",
    "qns": [
      {
        "qns": "Qns 1 test",
        "options": [
          "yes",
          "bruh",
          "huh",
          "wtf"
        ],
        "correct": 1,
        "explain": "because why tf not"
      },
      {
        "qns": "Qns 2 test",
        "options": [
          "gg",
          "well done",
          "cool",
          "haha"
        ],
        "correct": 2,
        "explain": "very nice"
      }
    ]
  }
  
}


// out on hold first
export var blanksData = {
  3: {
    "text": "fill the blanks of <> with <> and <>",
    "blanks": [
      {
        "options": [
          "a", "b", "c", "d",
        ],
        "answer": 0
      },
      {
        "options": [
          "e", "f", "g", "h",
        ],
        "answer": 1
      },
      {
        "options": [
          "j", "k", "l", "m",
        ],
        "answer": 2
      }
    ]
  }
}