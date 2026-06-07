const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async function(req, res) {
  const { name, phone, message } = req.body;

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const time = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Vilnius" });

  const text = `🔔 <b>Новая заявка!</b>\n\n👤 <b>Имя:</b> ${name}\n📞 <b>Телефон:</b> <a href="tel:${phone}">${phone}</a>\n💬 <b>Вопрос:</b> ${message || "—"}\n\n🕐 ${time}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML' })
  });

  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Сервер запущен на порту ' + PORT);
});