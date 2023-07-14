
export var connectedUsers = {}  // socket id to user data (no email and emeralds)
export var userDataList = {} // email to user data (with emeralds)

export var hostInfo = {
  hostSocket: "",
  phase: 0
};  // current phase of room they in

export var classData = {
  "3 Empathy": {},
  "3 Honour": {},
  "3 Diligence": {},
  "3 Resilience": {},
  "3 Integrity": {},
  "3 Harmony": {},
  "3 Respect": {},
  "3 Kindness": {},
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
          "cool"
        ],
        "correct": 2,
        "explain": "very nice"
      }
    ]
  }
  
}

// export var questionsList = {
//   2: {
//     "title": "Very poggers lmao",
//     "description": "this is a very bruh description",
//     "qns": [
//       {
//         "qns": "Qns 1 test",
//         "options": [
//           "yes",
//           "bruh",
//           "huh",
//           "wtf"
//         ],
//         "correct": "bruh",
//         "explain": "because why tf not"
//       },
//       {
//         "qns": "Qns 2 test",
//         "options": [
//           "gg",
//           "well done",
//           "cool"
//         ],
//         "correct": "cool",
//         "explain": "very nice"
//       }
//     ]
//   }
  
// }