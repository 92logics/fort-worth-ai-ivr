(function () {
  "use strict";

  var PORTAL = "https://fortworthtexas.bonfirehub.com/portal/?tab=openOpportunities";
  var CITY = "https://www.fortworthtexas.gov/";
  var CARE = "https://www.fortworthtexas.gov/departments/communications/customercare";
  var SOLID = "https://www.fortworthtexas.gov/departments/environmental-services/solidwaste";
  var RECYCLE = "https://www.fortworthtexas.gov/departments/environmental-services/solidwaste/recycling";
  var WATER = "https://www.fortworthtexas.gov/departments/water";
  var WATER_FAQ = "https://www.fortworthtexas.gov/departments/water/waterbillFAQ";

  var CHIPS = [
    "What is this demo?",
    "What is RFP 26-0263 asking for?",
    "How do I reach 311?",
    "What can 311 help with?",
    "Garbage and recycling contacts",
    "Water emergency or water bill help",
    "Where is City Hall?",
    "Is this an emergency line?",
    "Call my water account",
    "What is my trash pickup day?"
  ];

  var INTENTS = [
    {
      id: "greeting",
      phrases: ["hello", "hi", "hey", "help", "what can you do", "what can i ask", "get started", "what is this demo", "menu", "options"],
      refuse: false,
      answer: [
        "This is a scripted phone-assistant sample by 92 Logics. It is not the City of Fort Worth, it is not connected to city phone systems, and it does not place calls.",
        "It can repeat public facts about solicitation 26-0263 from CRM lead notes and public aggregator summaries, and public resident-service contacts from fortworthtexas.gov pages for 311, Customer Care, Solid Waste, and Water.",
        "It will refuse personal account lookups, pickup-day lookups by address, bill amounts, live transfers, and any topic those public pages do not cover."
      ],
      source: "Prototype scope. Notice portal: " + PORTAL
    },
    {
      id: "about-demo",
      phrases: ["is this official", "are you the city", "is this a bid", "who built", "92 logics", "prototype", "not a bid", "official system", "do you place calls", "are you calling", "dial", "outbound call"],
      refuse: false,
      answer: [
        "No. This page is a prototype by 92 Logics (Islamabad). It is not an official City of Fort Worth system and it is not a bid or proposal.",
        "The handset graphics are labels only. No telephone call, SMS, or email is sent from this browser. Matching runs locally from a fixed script."
      ],
      source: "92 Logics prototype label. Contact for the demo author: cowork@92logics.com"
    },
    {
      id: "rfp-scope",
      phrases: ["26-0263", "what is the rfp", "what is rfp", "ai ivr", "interactive voice", "what is the city asking", "scope", "solicitation", "bonfire", "enterprise ai", "channels", "cisco", "accela", "esri", "soc 2", "hosting"],
      refuse: false,
      answer: [
        "Public opportunity listings describe City of Fort Worth solicitation 26-0263 as an RFP for an AI-based Interactive Voice Response solution: an as-needed enterprise AI platform to modernize IVR and unify resident- and staff-facing services across voice, web chat, agent chat, SMS, outbound calling, and mobile-friendly channels.",
        "Aggregator summaries of the RFP also name document-grounded answers, workflow and knowledge-base features, U.S.-based hosting, SOC 2 Type II, and integrations that include Cisco IVR, Microsoft 365, Accela, and ESRI/ArcGIS.",
        "The official Bonfire portal requires login for full documents. This demo could not open the attachment package from the public portal tab, so treat those scope lines as secondary public summaries, not a substitute for the city’s PDF."
      ],
      source: "CRM lead 11 title/notes; public aggregator descriptions of 26-0263; portal " + PORTAL + " (login-walled for documents)"
    },
    {
      id: "deadline",
      phrases: ["deadline", "when is it due", "due date", "proposals due", "close date", "when are proposals"],
      refuse: false,
      answer: [
        "The 92 Logics CRM row for lead id 11 records deadline 2026-10-22 for Fort Worth AI IVR 26-0263, and some public aggregator pages also show an October 22, 2026 close.",
        "At least one aggregator still showed an earlier September 2026 date. The Bonfire open-opportunities tab did not expose a readable public listing during this build, and the CRM notes say the Bonfire listing was not reconfirmed on the city portal.",
        "Use the city’s portal (and any addenda after login) as the controlling schedule. This demo cannot confirm the live due time."
      ],
      source: "CRM leads.csv id 11; public aggregator close dates; portal fetch did not return opportunity detail"
    },
    {
      id: "buyer-contact",
      phrases: ["who is the buyer", "procurement contact", "contact email", "justin reid", "who do i email", "vendor contact", "questions about the rfp"],
      refuse: false,
      answer: [
        "The buyer is the City of Fort Worth, Texas. The notice URL recorded in the CRM is the Bonfire portal open-opportunities tab.",
        "The CRM contact_email field for lead id 11 is empty. No city procurement email for this RFP was verified from the public portal fetch in this build.",
        "Some secondary bid sites name Justin Reid as Acting Operations Manager; that is not a verified email address and this demo will not invent one."
      ],
      source: "CRM leads.csv id 11 (buyer implied by title/source; contact_email blank). Portal login-walled."
    },
    {
      id: "three11",
      phrases: ["311", "three one one", "how do i reach 311", "call center hours", "customer care", "contact center", "myfw", "text 817311", "817-392-1234", "8173921234"],
      refuse: false,
      answer: [
        "The City’s Customer Care pages list the 311 Fort Worth Contact Center at 817-392-1234. Specialists are listed Monday through Friday from 7 a.m. until 6 p.m. and Saturday from 7 a.m. until 4 p.m.",
        "Public pages also describe MyFW online and mobile requests, MyFW texting to 817311, website chat for many non-emergency topics, and email to 311@fortworthtexas.gov for missed-collection style issues on the recycling page.",
        "This scripted sample cannot open a live chat, send a text, or create a MyFW request."
      ],
      source: CARE + " ; " + RECYCLE
    },
    {
      id: "three11-topics",
      phrases: ["what can 311 help", "what does 311", "animal care", "code enforcement", "pothole", "graffiti", "stormwater", "streets", "traffic", "missed collection"],
      refuse: false,
      answer: [
        "Customer Care says 311 assists with non-emergency services such as Animal Care and Control, Code Enforcement, Environmental, Forestry, Graffiti, Parking, Public Property Mowing, Solid Waste, Stormwater, Streets, Traffic, and general inquiries for the City Manager’s Office.",
        "The same pages list many online request types (for example missed collection, pothole, graffiti, high grass, and water leak / mainbreak reporting links) and point residents to MyFW for after-hours online requests.",
        "For a true emergency, public pages say call 9-1-1. This demo cannot file a service request."
      ],
      source: CARE
    },
    {
      id: "trash",
      phrases: ["garbage", "trash", "recycling", "solid waste", "bulk waste", "yard waste", "drop-off", "blue cart", "brown cart", "garbage and recycling"],
      refuse: false,
      answer: [
        "Solid Waste Services pages say Fort Worth provides residential curbside garbage pickup once per week, plus recycling, bulk and yard waste collections, Drop-Off Stations, and related programs.",
        "For questions or to report an issue by phone, the Solid Waste customer-service block lists 817-392-1234. Call-center hours on that page are 7 a.m. to 6 p.m. Monday through Friday and 7 a.m. to 4 p.m. Saturdays.",
        "The recycling page says missed collections can be reported through the MyFW app, by dialing 311, by calling 817-392-1234, or by emailing 311@fortworthtexas.gov. This demo cannot look up your collection day."
      ],
      source: SOLID + " ; " + RECYCLE
    },
    {
      id: "water",
      phrases: ["water", "water bill", "water emergency", "main break", "sewer backup", "817-392-4477", "8173924477", "myh2o", "new water account", "deposit"],
      refuse: false,
      answer: [
        "Fort Worth Water pages list 817-392-4477 for customer service. Emergencies such as water main breaks and sewer backups are listed 24 hours a day — call that number and select option 1.",
        "Non-emergency call-center hours are listed as 7 a.m. to 7 p.m. Monday through Friday, closed on city holidays. New service setup is directed to the same customer-service number. The FAQ says a minimum residential deposit of $50 applies and is included in the first billing, with stated waiver criteria on the public page.",
        "Payment options described publicly include online card or bank draft, mail, in person, and phone. This demo cannot open MyH2O, read a balance, or take a payment."
      ],
      source: WATER + " ; " + WATER_FAQ
    },
    {
      id: "city-hall",
      phrases: ["city hall", "address", "where is city hall", "mailing address", "100 fort worth trail", "main number"],
      refuse: false,
      answer: [
        "Public city pages list City Hall at 100 Fort Worth Trail, Fort Worth, TX 76102, with main number 817-392-1234.",
        "That is the published mailing/physical address block on several department pages. Walk-in hours for Water assistance are separately listed on the Water department page as 8 a.m. to 5 p.m. Monday through Friday, excluding city holidays, on the 5th floor of that building.",
        "This demo cannot confirm whether a particular counter is open today."
      ],
      source: CITY + " ; " + WATER + " ; " + SOLID
    },
    {
      id: "emergency",
      phrases: ["emergency", "911", "9-1-1", "police", "fire", "ambulance", "is this an emergency"],
      refuse: false,
      answer: [
        "If this is an emergency, public City of Fort Worth pages say call 9-1-1 for ambulance, fire, or police.",
        "Non-emergency telephone numbers published on the Customer Care page include Police 817-392-4222, Fire 817-392-3000, Ambulance 817-927-9620, 311 at 817-392-1234, and Water Call Center 817-392-4477.",
        "This prototype is not an emergency line and cannot dispatch responders."
      ],
      source: CARE
    },
    {
      id: "refuse-account",
      phrases: ["my account", "my balance", "my bill amount", "call my water account", "look up my account", "account number", "social security", "ssn", "transfer me", "speak to an agent", "live agent", "place a call", "call them for me", "dial 311 for me"],
      refuse: true,
      answer: [
        "Refused. This prototype does not look up accounts, balances, or personal records, and it cannot place a call or transfer you to a live agent.",
        "Use the published numbers on fortworthtexas.gov if you need city staff: 311 / 817-392-1234 for many non-emergency services, or 817-392-4477 for Fort Worth Water (option 1 for water emergencies)."
      ],
      source: "Out of scope for this offline sample. Public numbers remain on " + CARE + " and " + WATER
    },
    {
      id: "refuse-schedule",
      phrases: ["what is my trash pickup day", "when is my garbage day", "pickup day for my address", "schedule for my street", "bulk day for my house", "my recycling day"],
      refuse: true,
      answer: [
        "Refused. Public pages describe citywide garbage and recycling programs, but they do not publish a per-address pickup calendar that this demo can search.",
        "Ask 311 / 817-392-1234, use MyFW, or check the city’s Solid Waste pages for the official tools. This sample will not invent a day for your street."
      ],
      source: "Not covered as address-level data on " + SOLID + " / " + RECYCLE
    },
    {
      id: "refuse-stats",
      phrases: ["how many calls", "call volume", "how many residents", "city statistics", "average wait time", "how busy is 311"],
      refuse: true,
      answer: [
        "Refused. This demo does not invent call volumes, wait times, or city statistics. None of those figures were taken from a verified public source for this prototype."
      ],
      source: "Explicitly excluded from this prototype’s script"
    }
  ];

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9@.+#\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function scoreIntent(intent, q) {
    var best = 0;
    for (var i = 0; i < intent.phrases.length; i++) {
      var phrase = intent.phrases[i];
      if (q === phrase) return 100;
      if (q.indexOf(phrase) !== -1) best = Math.max(best, phrase.length);
    }
    return best;
  }

  function matchIntent(raw) {
    var q = normalize(raw);
    if (!q) return null;

    var best = null;
    var bestScore = 0;
    for (var i = 0; i < INTENTS.length; i++) {
      var score = scoreIntent(INTENTS[i], q);
      if (score > bestScore) {
        bestScore = score;
        best = INTENTS[i];
      }
    }
    if (best && bestScore >= 3) return best;
    return null;
  }

  function fallback() {
    return {
      refuse: true,
      answer: [
        "Refused. That question is not covered by the public Fort Worth pages or the publicly summarized 26-0263 scope scripted into this demo.",
        "You can ask about 311 hours and topics, Solid Waste contacts, Water emergency and bill-payment contacts from fortworthtexas.gov, City Hall’s published address, or the high-level RFP description. Personal accounts, address-level pickup days, live dialing, and invented statistics are out of scope."
      ],
      source: "Refusal rule for uncovered topics"
    };
  }

  var thread = document.getElementById("thread");
  var form = document.getElementById("composer");
  var ask = document.getElementById("ask");
  var chips = document.getElementById("chips");

  function addBubble(role, payload) {
    var el = document.createElement("div");
    el.className = "bubble " + role + (payload.refuse ? " refuse" : "");
    if (role === "bot") {
      var tag = document.createElement("div");
      tag.className = "tag";
      tag.textContent = payload.refuse ? "Refused · scripted" : "Scripted reply";
      el.appendChild(tag);
    }
    (payload.answer || [payload.text]).forEach(function (line) {
      var p = document.createElement("p");
      p.textContent = line;
      el.appendChild(p);
    });
    if (payload.source) {
      var src = document.createElement("p");
      src.className = "source";
      src.textContent = "Source: " + payload.source;
      el.appendChild(src);
    }
    thread.appendChild(el);
    thread.scrollTop = thread.scrollHeight;
  }

  function respond(text) {
    addBubble("user", { answer: [text] });
    var intent = matchIntent(text) || fallback();
    addBubble("bot", intent);
  }

  CHIPS.forEach(function (label) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = label;
    btn.addEventListener("click", function () {
      respond(label);
    });
    chips.appendChild(btn);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = ask.value.trim();
    if (!text) return;
    ask.value = "";
    respond(text);
  });

  addBubble("bot", {
    refuse: false,
    answer: [
      "Simulated Fort Worth AI IVR sample. Line status: not placing a call.",
      "Ask about public 311, trash, water, City Hall contacts, or the high-level 26-0263 scope. Account lookups and live dialing are refused."
    ],
    source: "Prototype greeting · " + PORTAL
  });
})();
