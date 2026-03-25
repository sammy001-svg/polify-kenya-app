"use server";

export async function generateAIContent(type: string, briefMessage: string, tone: string, hasImage?: boolean) {
  // Simulating an AI delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const tonePrefix = tone.charAt(0).toUpperCase() + tone.slice(1);

  switch (type) {
    case "speech":
      return `[OPENING]\n"Honorable guests, fellow citizens, and friends. I stand before you today with ${tonePrefix === "Aggressive" ? "unwavering resolve" : tonePrefix === "Inspiring" ? "a heart full of hope" : "deep concern"} regarding ${briefMessage}."\n\n[THE HOOK]\n"We have seen the statistics, but more importantly, we have seen the faces. The faces of our youth, our elders, and our hard-working families who are directly impacted by ${briefMessage} every single day."\n\n[THE SOLUTION]\n"My administration's response to ${briefMessage} will be decisive. We are not here to offer band-aid solutions. We will implement a comprehensive framework that prioritizes efficiency, transparency, and immediate relief."\n\n[CALL TO ACTION]\n"But I cannot do this alone. Change requires your voice, your vote, and your partnership. Let's make history together."\n\n[CLOSING]\n"Thank you, and God bless our great nation."`;

    case "social":
      return `Twitter (X):\n"The time for silence on ${briefMessage} is over. ${tonePrefix === "Aggressive" ? "We demand action now." : "Together, we can build a better future."} Join the movement. 🗳️ #Campaign2027 #Fix${briefMessage.replace(/\s/g, "")}"\n\nFacebook:\n"I've heard your concerns about ${briefMessage} in every ward I've visited. Our new policy focus will ensure that NO ONE is left behind. Check out our full plan on the website! 🔗 #CommunityFirst #Leadership"\n\nInstagram:\n"Vision. Action. Results. 🇰🇪 ${briefMessage} isn't just a challenge—it's an opportunity for us to prove what we're capable of when we stand united. #ChangeIsComing #PoliFy"`;

    case "press":
      return `FOR IMMEDIATE RELEASE\n\nDATE: ${new Date().toLocaleDateString()}\nLOCATION: Nairobi, Kenya\n\nOFFICIAL STATEMENT ON ${briefMessage.toUpperCase()}\n\nNAIROBI – Today, the Campaign Office of [Candidate Name] released a formal position on the critical issue of ${briefMessage}. \n\n"Our stance is clear: ${briefMessage} requires a ${tonePrefix.toLowerCase()} approach that delivers tangible results within the first 100 days," stated the lead policy advisor.\n\nKey pillars of the proposed response include:\n1. Strategic Resource Reallocation\n2. Real-time Impact Monitoring via PoliFy\n3. Community-led Oversight Committees\n\nFor media inquiries, contact: press@polify.ke\n\n###`;

    case "flyer":
      // More sophisticated "AI-like" generation logic for flyers
      const isAggressive = tonePrefix === "Aggressive";
      const isEmpathetic = tonePrefix === "Empathetic";
      
      const headlines = {
        Inspiring: `A New Dawn for ${briefMessage}`,
        Aggressive: `End the Failure of ${briefMessage}`,
        Empathetic: `Listening to Your Voice on ${briefMessage}`,
        "Fact-Based": `The Strategic Plan for ${briefMessage}`,
      };

      const slogans = {
        Inspiring: "Empowering every citizen, building a better future.",
        Aggressive: "Enough is enough. It's time for real accountability.",
        Empathetic: "A leader who understands. A neighbor who cares.",
        "Fact-Based": "Data-driven results for a stronger community.",
      };

      const bulletPoints = [
        isAggressive ? "Total Budget Transparency" : "Inclusive Economic Growth",
        isEmpathetic ? "Direct Community Support" : "Modern Tech Infrastructure",
        "Zero-Tolerance for Corruption",
      ];

      return JSON.stringify({
        headline: headlines[tonePrefix as keyof typeof headlines] || `Action for ${briefMessage}`,
        slogan: slogans[tonePrefix as keyof typeof slogans] || "Better Leadership, Better Results",
        bullet1: bulletPoints[0],
        bullet2: bulletPoints[1],
        bullet3: bulletPoints[2],
      });

    case "video":
      return `[SCENE 1: OPENING]\nFADE IN:\nEXT. BUSY NAIROBI STREET - DAY\n${hasImage ? "[UPLOADED IMAGE OF CANDIDATE OVERLAID]" : "Candidate walks through a crowd, shaking hands."}\n\nCANDIDATE (V.O.)\n"They say ${briefMessage} is an old problem. I say it's time for new thinking."\n\n[SCENE 2: THE CHALLENGE]\nCUT TO: Close up of a concerned citizen.\n\nCANDIDATE\n"I see the struggle. I feel the frustration. But I also see the potential."\n\n[SCENE 3: THE VISION]\nGRAPHIC OVERLAY: SMART CABINET - POLIFY DASHBOARD\n${hasImage ? "[ANIMATED TRANSITION TO UPLOADED CAMPAIGN VISUAL]" : ""}\n\nCANDIDATE\n"With the right tools and the right ${tonePrefix.toLowerCase()} leadership, we will conquer ${briefMessage}."\n\n[SCENE 4: OUTRO]\nFADE TO BLACK.\nLOGO: POLIFY KENYA - VOTE FOR CHANGE\n\n[END SCRIPT]`;

    default:
      return "Unable to generate content for this type.";
  }
}
