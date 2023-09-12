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
      john: {
        emeralds: 200,
        email: "john@email.com",
      },
      bruh: {
        emeralds: 100,
        email: "bruh@email.com",
      },
      lmao: {
        emeralds: 0,
        email: "lmao@email.com",
      },
      oi: {
        emeralds: 800,
        email: "oi@email.com",
        armoury: ["Steak", "Healing", "Bow & Arrows"],
      },
      nani: {
        emeralds: 600,
        email: "nani@email.com",
      },
    },
  },
  "3 Honour": {
    store: 0,
    students: {
      john: {
        emeralds: 200,
        email: "john@email.com",
      },
      bruh: {
        emeralds: 100,
        email: "bruh@email.com",
      },
      lmao: {
        emeralds: 0,
        email: "lmao@email.com",
      },
      oi: {
        emeralds: 800,
        email: "oi@email.com",
        armoury: ["Steak", "Healing", "Bow & Arrows"],
      },
      nani: {
        emeralds: 600,
        email: "nani@email.com",
      },
    },
  },
  "3 Diligence": {
    store: 0,
    students: {
      john: {
        emeralds: 200,
        email: "john@email.com",
      },
      bruh: {
        emeralds: 100,
        email: "bruh@email.com",
      },
      lmao: {
        emeralds: 0,
        email: "lmao@email.com",
      },
      oi: {
        emeralds: 800,
        email: "oi@email.com",
        armoury: ["Steak", "Healing", "Bow & Arrows"],
      },
      nani: {
        emeralds: 600,
        email: "nani@email.com",
      },
    },
  },
  "3 Resilience": {
    store: 0,
    students: {
      john: {
        emeralds: 200,
        email: "john@email.com",
      },
      bruh: {
        emeralds: 100,
        email: "bruh@email.com",
      },
      lmao: {
        emeralds: 0,
        email: "lmao@email.com",
      },
      oi: {
        emeralds: 800,
        email: "oi@email.com",
        armoury: ["Steak", "Healing", "Bow & Arrows"],
      },
      nani: {
        emeralds: 600,
        email: "nani@email.com",
      },
    },
  },
  "3 Integrity": {
    store: 0,
    students: {
      john: {
        emeralds: 200,
        email: "john@email.com",
      },
      bruh: {
        emeralds: 100,
        email: "bruh@email.com",
      },
      lmao: {
        emeralds: 0,
        email: "lmao@email.com",
      },
      oi: {
        emeralds: 800,
        email: "oi@email.com",
        armoury: ["Steak", "Healing", "Bow & Arrows"],
      },
      nani: {
        emeralds: 600,
        email: "nani@email.com",
      },
    },
  },
  "3 Harmony": {
    store: 0,
    students: {
      john: {
        emeralds: 200,
        email: "john@email.com",
      },
      bruh: {
        emeralds: 100,
        email: "bruh@email.com",
      },
      lmao: {
        emeralds: 0,
        email: "lmao@email.com",
      },
      oi: {
        emeralds: 800,
        email: "oi@email.com",
        armoury: ["Steak", "Healing", "Bow & Arrows"],
      },
      nani: {
        emeralds: 600,
        email: "nani@email.com",
      },
    },
  },
  "3 Respect": {
    store: 0,
    students: {
      john: {
        emeralds: 200,
        email: "john@email.com",
      },
      bruh: {
        emeralds: 100,
        email: "bruh@email.com",
      },
      lmao: {
        emeralds: 0,
        email: "lmao@email.com",
      },
      oi: {
        emeralds: 800,
        email: "oi@email.com",
        armoury: ["Steak", "Healing", "Bow & Arrows"],
      },
      nani: {
        emeralds: 600,
        email: "nani@email.com",
      },
    },
  },
  "3 Kindness": {
    store: 0,
    students: {
      john: {
        emeralds: 200,
        email: "john@email.com",
      },
      bruh: {
        emeralds: 100,
        email: "bruh@email.com",
      },
      lmao: {
        emeralds: 0,
        email: "lmao@email.com",
      },
      oi: {
        emeralds: 800,
        email: "oi@email.com",
        armoury: ["Steak", "Healing", "Bow & Arrows"],
      },
      nani: {
        emeralds: 600,
        email: "nani@email.com",
      },
    },
  },
};

export var questionsReport = {
  6: [],
};

export var quizData = {
  6: {
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
    "Bow & Arrows": {
      description: "1-11 damage",
      emeralds: 100,
      status: "Need",
    },
    Crossbow: {
      description: "9 damage",
      emeralds: 150,
      status: "Need",

    },
    Trident: {
      description: "9 damage",
      emeralds: 200,
      status: "Need",

    },
    "Stone Sword": {
      description: "6 damage",
      emeralds: 100,
      status: "Need",

    },
    "Iron Sword": {
      description: "7 damage",
      emeralds: 150,
      status: "Need",

    },
    "Diamond Sword": {
      description: "8 damage",
      emeralds: 200,
      status: "Need",

    },
  },
  Tools: {
    "Stone Pickaxe": {
      description: "4 damage",
      emeralds: 50,
      status: "Want",
    },
    "Iron Pickaxe": {
      description: "5 damage",
      emeralds: 100,
      status: "Want",
    },
    "Diamond Pickaxe": {
      description: "6 damage",
      emeralds: 150,
      status: "Want",
    },
  },
  Armour: {
    "Golden Helmet": {
      description: "2 defense",
      emeralds: 100,
      status: "Need",
    },
    "Diamond Helmet": {
      description: "3 defense",
      emeralds: 150,
      status: "Need",
    },
    "Leather Chestplate": {
      description: "3 defense",
      emeralds: 200,
      status: "Need",
    },
    "Iron Chestplate": {
      description: "6 defense",
      emeralds: 100,
      status: "Need",
    },
    "Netherite Chestplate": {
      description: "6 defense",
      emeralds: 150,
      status: "Need",
    },
  },
  Dyes: {
    "Purple Dye": {
      description: "nil",
      emeralds: 50,
      status: "Want",
    },
    "Red Dye": {
      description: "nil",
      emeralds: 50,
      status: "Want",
    },
    "Orange Dye": {
      description: "nil",
      emeralds: 50,
      status: "Want",
    },
    "Green Dye": {
      description: "nil",
      emeralds: 50,
      status: "Want",
    },
    "Yellow Dye": {
      description: "nil",
      emeralds: 50,
      status: "Want",
    },
  },
  Food: {
    "Golden Carrot": {
      description: "6 hunger",
      emeralds: 20,
      status: "Want",
    },
    "Famous Cookie": {
      description: "2 hunger",
      emeralds: 10,
      status: "Want",
    },
    Steak: {
      description: "8 hunger",
      emeralds: 5,
      status: "Want",
    },
    "Roasted Rabbit": {
      description: "5 hunger",
      emeralds: 5,
      status: "Want",
    },
    "Cooked Cod": {
      description: "2 hunger",
      emeralds: 2,
      status: "Want",
    },
  },
  Potions: {
    Weakness: {
      description: "-0.7 damage",
      emeralds: 100,
      status: "Need",
    },
    Slowness: {
      description: "-15% speed",
      emeralds: 100,
      status: "Need",
    },
    "Night Vision": {
      description: "see in the dark",
      emeralds: 100,
      status: "Want",
    },
    Strength: {
      description: "+ 3 damage",
      emeralds: 250,
      status: "Need",
    },
    Healing: {
      description: "8 health",
      emeralds: 50,
      status: "Need",
    },
  },
};

export var top4Classes = {};
