const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://my-site-snowy-nine.vercel.app'
}));
app.use(express.json());

app.post('/send', async function(req, res) {
  const { name, phone, message } = req.body;

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = `🔔 Новая заявка!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Вопрос: ${message}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text })
  });

  res.json({ ok: true });
});

app.listen(3000, function() {
  console.log('Сервер запущен на порту 3000');
});