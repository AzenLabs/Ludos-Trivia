export var connectedUsers = {}; // socket id to user data (no email and emeralds)
export var userDataList = {}; // email to user data (with emeralds)

export var hostInfo = {
  hostSocket: "",
  phase: 0,
}; // current phase of room they in

export var classUsers = {
  "3 Empathy": [],
  "3 Honour": [],
  "3 Diligence": [],
  "3 Resilience": [],
  "3 Integrity": [],
  "3 Harmony": [],
  "3 Respect": [],
  "3 Kindness": [],
};

export var classScoreboard = {
  "3 Empathy": {
    store: 0,
    students: {
      john: 200,
      bruh: 100,
      lmao: 0,
      oi: 800,
      nani: 600,
    },
  },
  "3 Honour": {
    store: 0,
    students: {
      john: 200,
      bruh: 100,
      lmao: 0,
      oi: 800,
      nani: 600,
    },
  },
  "3 Diligence": {
    store: 0,
    students: {
      john: 200,
      bruh: 100,
      lmao: 0,
      oi: 800,
      nani: 600,
    },
  },
  "3 Resilience": {
    store: 0,
    students: {
      john: 200,
      bruh: 100,
      lmao: 0,
      oi: 800,
      nani: 600,
    },
  },
  "3 Integrity": {
    store: 0,
    students: {
      john: 200,
      bruh: 100,
      lmao: 0,
      oi: 800,
      nani: 600,
    },
  },
  "3 Harmony": {
    store: 0,
    students: {
      john: 200,
      bruh: 100,
      lmao: 0,
      oi: 800,
      nani: 600,
    },
  },
  "3 Respect": {
    store: 0,
    students: {
      john: 200,
      bruh: 100,
      lmao: 0,
      oi: 800,
      nani: 600,
    },
  },
  "3 Kindness": {
    store: 0,
    students: {
      john: 200,
      bruh: 100,
      lmao: 0,
      oi: 800,
      nani: 600,
    },
  },
};

export var questionsReport = {
  3: [],
};

export var quizData = {
  3: {
    title: "Financial Foundations: Mastering the Money Game",
    description:
      "Test your financial savviness and boost your basic money management skills to make informed financial decisions!",
    qns: [
      {
        qns: "What is delayed gratification?",
        options: [
          "Choosing immediate rewards",
          "Waiting for better outcomes in the future",
          "Indulging in instant pleasure",
          "None of the above",
        ],
        correct: 1,
        explain: "Add explanation here",
      },
      {
        qns: "2. Which of the following is an example of instant gratification?",
        options: [
          "Saving money for a future purchase",
          "Eating a healthy meal",
          "Buying a new video game without considering your budget",
          "All of the above",
        ],
        correct: 2,
        explain: "very nice",
      },
      {
        qns: "3. You have been saving money for months to buy a new bike. However, your favourite gaming console just went on sale. What do you do?",
        options: [
          "Buy the gaming console now",
          "Wait a little longer and buy the bike as planned",
          "Split the money and get both the gaming console and the bike",
          "Give up on both and save the money for something else",
        ],
        correct: 1,
        explain: "very nice",
      },
    ],
  },
};

export var armouryImgList = {
  Weapons: {
    Bow: {
      description: "20 damage",
      emeralds: 100,
    },
    Crossbow: {
      description: "25 damage",
      emeralds: 150,
    },
    Trident: {
      description: "70 damage",
      emeralds: 200,
    },
    "Sword I": {
      description: "40 damage",
      emeralds: 100,
    },
    "Sword II": {
      description: "60 damage",
      emeralds: 150,
    },
    "Sword III": {
      description: "80 damage",
      emeralds: 200,
    },
  },
  Tools: {
    "Pickaxe I": {
      description: "5 damage",
      emeralds: 50,
    },
    "Pickaxe II": {
      description: "10 damage",
      emeralds: 100,
    },
    "Pickaxe III": {
      description: "15 damage",
      emeralds: 150,
    },
  },
  Armour: {
    "Helmet I": {
      description: "10 defense",
      emeralds: 100,
    },
    "Helmet II": {
      description: "20 defense",
      emeralds: 150,
    },
    "Chestplate I": {
      description: "10 defense",
      emeralds: 200,
    },
    "Chestplate II": {
      description: "20 defense",
      emeralds: 100,
    },
    "Chestplate III": {
      description: "30 defense",
      emeralds: 150,
    },
  },
  Dyes: {
    "Purple Dye": {
      description: "nil",
      emeralds: 50,
    },
    "Red Dye": {
      description: "nil",
      emeralds: 50,
    },
    "Orange Dye": {
      description: "nil",
      emeralds: 50,
    },
    "Green Dye": {
      description: "nil",
      emeralds: 50,
    },
    "Yellow Dye": {
      description: "nil",
      emeralds: 50,
    },
  },
  Food: {
    "Ferrero Roche": {
      description: "100 health",
      emeralds: 20,
    },
    "Famous Cookie": {
      description: "10 health",
      emeralds: 10,
    },
    Steak: {
      description: "60 health",
      emeralds: 5,
    },
    "Roasted Rabbit": {
      description: "60 health",
      emeralds: 5,
    },
    "Raw Fish": {
      description: "30 health",
      emeralds: 2,
    },
  },
  Potions: {
    "Weakness": {
      description: "15 damage",
      emeralds: 100,
    },
    "Slowness": {
      description: "Reduce movement",
      emeralds: 100,
    },
    "Night Vision": {
      description: "See in the dark",
      emeralds: 100,
    },
    "Strength": {
      description: "30 damage",
      emeralds: 250,
    },
    "Healing": {
      description: "100 health",
      emeralds: 50,
    },
  },
};
