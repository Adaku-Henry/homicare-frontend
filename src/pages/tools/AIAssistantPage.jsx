import React, { useEffect, useRef, useState } from "react";
import "./AIAssistant.css";

/* =========================================================
   🧠 AI MEMORY (SESSION + CONTEXT)
========================================================= */
const memory = {
  lastIntent: null,
  lastService: null,
  lastMessage: null,
  step: null
};

/* =========================================================
   💼 SERVICE DATABASE (EXPANDED)
========================================================= */
const services = [
  { name: "Cleaning", basePrice: 15000 },
  { name: "Plumbing", basePrice: 20000 },
  { name: "Electrician", basePrice: 25000 },
  { name: "Laundry", basePrice: 12000 },
  { name: "Painting", basePrice: 30000 }
];

/* =========================================================
   👨‍🔧 PROVIDERS DATABASE
========================================================= */
const providers = [
  { name: "John Cleaner", service: "Cleaning", rating: 4.8, available: true },
  { name: "Mike Plumbing", service: "Plumbing", rating: 4.7, available: true },
  { name: "Electric Pro", service: "Electrician", rating: 4.9, available: false }
];

/* =========================================================
   🧠 INTENT DETECTOR (UPGRADED)
========================================================= */
function detectIntent(text) {
  const msg = text.toLowerCase();

  if (msg.includes("book")) return "BOOK";
  if (msg.includes("price") || msg.includes("cost")) return "PRICE";
  if (msg.includes("available") || msg.includes("free")) return "AVAILABILITY";
  if (msg.includes("near me")) return "LOCATION";
  if (msg.includes("hello") || msg.includes("hi")) return "GREETING";

  const service = services.find(s =>
    msg.includes(s.name.toLowerCase())
  );

  if (service) return "SERVICE";

  return "UNKNOWN";
}

/* =========================================================
   🤖 AI ENGINE (UPGRADED LOGIC)
========================================================= */
function generateAIReply(input) {
  const intent = detectIntent(input);
  const msg = input.toLowerCase();

  memory.lastMessage = input;

  /* ---------------- GREETING ---------------- */
  if (intent === "GREETING") {
    return {
      type: "text",
      text: "Hello 👋 I’m your HomiCare AI Assistant. I can help you book services, check prices, and find providers."
    };
  }

  /* ---------------- CONTEXT FOLLOW-UP ---------------- */
  if (memory.lastIntent === "BOOK" && intent === "SERVICE") {
    memory.lastService = input;

    return {
      type: "booking_step",
      text: `Great 👍 You want ${input}. Do you want me to find providers or estimate price?`,
      options: ["Find Providers", "Estimate Price"]
    };
  }

  /* ---------------- BOOKING ENGINE ---------------- */
  if (intent === "BOOK") {
    memory.lastIntent = "BOOK";

    return {
      type: "booking_start",
      text: "What service would you like to book?",
      options: services.map(s => s.name)
    };
  }

  /* ---------------- PRICE ENGINE (SMART) ---------------- */
  if (intent === "PRICE") {
    const service = services.find(s =>
      msg.includes(s.name.toLowerCase())
    );

    if (service) {
      const min = service.basePrice;
      const max = service.basePrice + 5000;

      return {
        type: "pricing",
        text: `${service.name} costs between ${min} - ${max} UGX depending on location and provider.`,
        confidence: 0.92
      };
    }

    return {
      type: "pricing_list",
      text: "Here are our service prices:",
      data: services
    };
  }

  /* ---------------- SERVICE ENGINE ---------------- */
  if (intent === "SERVICE") {
    const matched = providers.filter(p =>
      msg.includes(p.service.toLowerCase())
    );

    return {
      type: "providers",
      text: "Available providers:",
      data: matched.length ? matched : providers,
      confidence: 0.88
    };
  }

  /* ---------------- AVAILABILITY ENGINE ---------------- */
  if (intent === "AVAILABILITY") {
    const available = providers.filter(p => p.available);

    return {
      type: "availability",
      text: "These providers are currently available:",
      data: available
    };
  }

  /* ---------------- LOCATION ENGINE ---------------- */
  if (intent === "LOCATION") {
    return {
      type: "location",
      text: "Searching nearby providers in Kampala...",
      confidence: 0.85
    };
  }

  /* ---------------- FALLBACK (SMARTER) ---------------- */
  return {
    type: "fallback",
    text: "I’m not fully sure, but I can help you book services, check prices, or find providers near you.",
    suggestions: ["Book service", "Check price", "Find cleaner"]
  };
}

/* =========================================================
   💬 MAIN COMPONENT
========================================================= */
function AIAssistantPage() {
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("ai_chat")) || [];
  });

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, typing]);

  /* ---------------- SAVE CHAT ---------------- */
  useEffect(() => {
    localStorage.setItem("ai_chat", JSON.stringify(messages));
  }, [messages]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    /* ---------------- AI THINKING SIMULATION ---------------- */
    setTimeout(() => {
      const aiReply = generateAIReply(input);

      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        ...aiReply,
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMsg]);
      setTyping(false);
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  /* ---------------- QUICK ACTIONS ---------------- */
  const quickReplies = [
    "Book cleaner",
    "Plumber near me",
    "Check price",
    "Electrician available"
  ];

  /* =========================================================
     🎨 UI
  ========================================================= */
  return (
    <div className="ai-container">

      <div className="ai-header">
        🤖 HomiCare Production AI v2
      </div>

      <div className="ai-chat" ref={chatRef}>

        {messages.map(msg => (
          <div key={msg.id} className={`msg ${msg.sender}`}>

            <div className="bubble">
              {msg.text}
            </div>

            {/* PROVIDERS CARD */}
            {msg.type === "providers" && (
              <div className="card">
                {msg.data.map((p, i) => (
                  <div key={i} className="card-item">
                    {p.name} ⭐ {p.rating}
                  </div>
                ))}
              </div>
            )}

            {/* PRICING LIST */}
            {msg.type === "pricing_list" && (
              <div className="card">
                {msg.data.map((s, i) => (
                  <div key={i}>
                    {s.name} - {s.basePrice} UGX
                  </div>
                ))}
              </div>
            )}

            {/* OPTIONS */}
            {msg.options && (
              <div className="options">
                {msg.options.map((o, i) => (
                  <button key={i} onClick={() => setInput(o)}>
                    {o}
                  </button>
                ))}
              </div>
            )}

            <div className="time">{msg.time}</div>

          </div>
        ))}

        {typing && <div className="typing">AI is analyzing request...</div>}

      </div>

      <div className="quick">
        {quickReplies.map((q, i) => (
          <button key={i} onClick={() => setInput(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="ai-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask HomiCare AI..."
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}

export default AIAssistantPage;