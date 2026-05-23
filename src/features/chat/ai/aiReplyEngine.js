// ================= AI CHAT FLOW ENGINE (ADVANCED v2) =================

// ---------------- SESSION MEMORY ----------------
const sessionMemory = {};

function getSession(userId = "default") {
  if (!sessionMemory[userId]) {
    sessionMemory[userId] = {
      step: 0,
      service: null,
      location: null,
      time: null,
      intent: null,
      lastMessage: null,
    };
  }
  return sessionMemory[userId];
}

// ---------------- FUZZY INTENT MATCHER (IMPROVED "FAVOUR") ----------------
function matchIntent(text, keywords) {
  return keywords.some((k) => text.includes(k));
}

// ---------------- MOCK BACKEND (B: API READY LAYER) ----------------
async function fetchProviders() {
  // 🔗 REAL BACKEND HOOK (Django / Node ready)
  // return fetch(`/api/providers?service=${service}&location=${location}`);

  return [
    { name: "John Expert", rating: 4.8 },
    { name: "Sarah Pro", rating: 4.6 },
  ];
}

// ---------------- MAIN ENGINE ----------------
export default async function generateAIReply(input, userId = "default") {
  const text = input.toLowerCase().trim();
  const session = getSession(userId);

  session.lastMessage = text;

  // ================= RESET =================
  if (matchIntent(text, ["reset", "restart", "start over"])) {
    session.step = 0;
    session.service = null;
    session.location = null;
    session.time = null;

    return "🔄 Reset done. What service do you need today?";
  }

  // ================= GREETING =================
  if (matchIntent(text, ["hi", "hello", "hey"])) {
    session.step = 1;
    return "👋 Welcome to HomiCare AI!\nTell me what you need (cleaning, plumbing, electrical, laundry, babysitting).";
  }

  // ================= SERVICE DETECTION (IMPROVED FUZZY) =================
  if (session.step <= 1) {
    if (matchIntent(text, ["clean", "dust", "wash"])) {
      session.service = "cleaning";
      session.step = 2;
      return "🧹 Cleaning selected.\nWhere should we send the cleaner?";
    }

    if (matchIntent(text, ["plumb", "pipe", "leak"])) {
      session.service = "plumbing";
      session.step = 2;
      return "🔧 Plumbing selected.\nWhere is the issue located?";
    }

    if (matchIntent(text, ["electric", "power", "socket"])) {
      session.service = "electrical";
      session.step = 2;
      return "⚡ Electrical service selected.\nWhere do you need help?";
    }

    if (matchIntent(text, ["laundry", "wash clothes"])) {
      session.service = "laundry";
      session.step = 2;
      return "👕 Laundry selected.\nPickup or home service?";
    }

    if (matchIntent(text, ["baby", "child", "nanny"])) {
      session.service = "babysitting";
      session.step = 2;
      return "👶 Babysitting selected.\nWhere are you located?";
    }
  }

  // ================= STEP 2: LOCATION =================
  if (session.step === 2) {
    session.location = input;
    session.step = 3;

    return `📍 Location saved: ${session.location}\nWhen do you need the service?`;
  }

  // ================= STEP 3: TIME =================
  if (session.step === 3) {
    session.time = input;
    session.step = 4;

    return `⏰ Time noted: ${session.time}\nSearching providers near ${session.location}...`;
  }

  // ================= STEP 4: PROVIDER SEARCH (B + D FEATURE) =================
  if (session.step === 4) {
    session.step = 5;

    const providers = await fetchProviders();

    return `👨‍🔧 Found providers:\n\n${providers
      .map((p) => `• ${p.name} ⭐${p.rating}`)
      .join("\n")}\n\n👉 Do you want to book one?`;
  }

  // ================= CONFIRM BOOKING =================
  if (matchIntent(text, ["yes", "book", "confirm"])) {
    session.step = 6;
    return "✅ Booking confirmed!\nA provider will contact you shortly.";
  }

  if (matchIntent(text, ["no", "cancel"])) {
    session.step = 1;
    return "👍 Okay. What else would you like help with?";
  }

  // ================= PRICING =================
  if (matchIntent(text, ["price", "cost", "how much"])) {
    return "💰 Prices vary:\nCleaning 20k–50k UGX\nPlumbing 30k+\nElectrical 25k+";
  }

  // ================= EMERGENCY =================
  if (matchIntent(text, ["emergency", "urgent"])) {
    session.step = 4;
    return "🚨 Emergency detected!\nFinding nearest available provider...";
  }

  // ================= C: VOICE COMMAND SUPPORT =================
  if (matchIntent(text, ["voice", "speak", "microphone"])) {
    return "🎤 Voice mode activated (UI support required).\nYou can now speak your request.";
  }

  // ================= D: WHATSAPP STYLE CHAT BEHAVIOR =================
  if (text.includes("status")) {
    return "📱 You can view live updates like WhatsApp:\n• typing...\n• seen\n• delivered\n• online status";
  }

  // ================= DEFAULT SMART FALLBACK =================
  return "🤖 I didn't fully understand.\nTry: 'book cleaning', 'plumbing issue', or 'price'.";
}