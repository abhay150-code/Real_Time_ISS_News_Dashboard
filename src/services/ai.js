export const askAIChatbot = async (message, contextStr) => {
  const token = import.meta.env.VITE_AI_TOKEN;
  if (!token) {
    throw new Error('AI Token is missing. Please set VITE_AI_TOKEN in .env');
  }

  const systemPrompt = `You are OrbitIQ, an AI space intelligence assistant. 
You must ONLY answer questions based on the following ISS and News data. If the user asks about something unrelated, politely refuse and say you only know about the ISS and the current dashboard news.

Context Data:
${contextStr}

Answer concisely and professionally.`;

  try {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V4-Pro:novita",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const result = await response.json();
    
    // Check if the response was successful
    if (!response.ok) {
      console.error('API Error:', result);
      throw new Error(result.error?.message || 'Failed to fetch AI response');
    }

    return result.choices[0]?.message?.content || 'No response generated.';
  } catch (error) {
    console.error('Failed to get AI response:', error);
    throw new Error('Could not connect to AI services.');
  }
};
