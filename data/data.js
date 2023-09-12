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
        qns: "3. Alwis wanted to buy a PS5. He knew that the Shopaa 11.11 sale was soon to arrive. What should he do?",
        options: [
          "Wait for the sale to arrive and buy the PS5 at $400",
          "Buy the PS5 now for $500",
          "Invest the money into the stock market with 0 experience",
          "Buy a 'Brand New' PS5 now from Carousell at $400",
        ],
        correct: 1,
        explain: "very nice",
      },
      {
        qns: "4. How can you protect your savings from inflation",
        options: [
          "By investing in a diversified portfolio of assets",
          "By burying your money in a hidden underground vault",
          "By converting all your savings into rare collectibles and art pieces",
          "By exchanging your money for foreign currency and storing it in offshore accounts",
        ],
        correct: 1,
        explain: "very nice",
      },
      {
        qns: "5. Which of the following is an example of sharing your wealth with others while also considering long-term financial planning",
        options: [
          "Making a significant one-time donation to a local charity",
          "Purchasing the latest luxury smartphone model",
          "Saving for retirement through a diversified investment portfolio",
          "Covering the educational expenses for a student's entire academic journey",
        ],
        correct: 1,
        explain: "very nice",
      },
      {
        qns: "6. What does the 50/30/20 rule representing for budgeting",
        options: [
          "Allocate 50% to needs, 30% to wants, 20% to savings",
          "Spend 50% on needs, 30$ on wants, 20% for sharing",
          "Save 50%, spend 30%, share 20%",
          "Share 50%, Save 30%, Spend 20%",
        ],
        correct: 1,
        explain: "very nice",
      },
      {
        qns: "7. Based on the scenario, with a goal to survive and eventually thrive, how should you allocate your budget?",
        options: [
          "Invest 40% in Tools, 20% in Food, 20% in Weapons, and 20% in Armour",
          "Spend 40% on Materials, 20% on Food, 20% on Weapons, and 20% on Aesthetics",
          "Prioritise 40% on Tools, 20% on Food, 20% on Armour, and 20% on Vehicles",
          "Allocate 40% to Tools, 20% to Food, 20% to Weapons, and 20% to Materials",
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
