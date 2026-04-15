export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { task, model } = req.body;

  if (!task || !model) {
    return res.status(400).json({ error: 'Missing task or model' });
  }

  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const allowedModels = [
    'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
    'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    'mistralai/Mistral-7B-Instruct-v0.3',
    'Qwen/Qwen2.5-72B-Instruct-Turbo',
  ];

  if (!allowedModels.includes(model)) {
    return res.status(400).json({ error: 'Model not supported' });
  }

  try {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable AI assistant. Provide clear, accurate, and well-structured responses. Be concise but thorough.'
          },
          {
            role: 'user',
            content: task
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Together API error:', error);
      return res.status(502).json({ error: 'Inference provider error. Please try again.' });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      return res.status(502).json({ error: 'No response from inference provider' });
    }

    return res.status(200).json({ result });

  } catch (err) {
    console.error('Inference error:', err);
    return res.status(500).json({ error: 'Internal error. Please try again.' });
  }
}
