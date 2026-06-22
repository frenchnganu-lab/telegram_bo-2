const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const form = document.getElementById("leadForm");
const result = document.getElementById("result");

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/cr7vjbingws8zj2jk2xwqc94zmxqjdns";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  result.textContent = "Отправляем заявку...";

  const formData = new FormData(form);

  const lead = {
    date: new Date().toLocaleString("ru-RU"),
    page: "architect_designer_landing",

    name: formData.get("name") || "",
    studio: formData.get("studio") || "",
    phone: formData.get("phone") || "",
    email: formData.get("email") || "",
    interest: formData.get("interest") || "",
    comment: formData.get("comment") || "",

    telegramUsername: tg?.initDataUnsafe?.user?.username || "",
    telegramId: tg?.initDataUnsafe?.user?.id || "",

    source: "telegram_mini_app"
  };

  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lead)
    });

    if (response.ok) {
      result.textContent = "Заявка успешно отправлена. Мы скоро свяжемся с вами.";
      form.reset();

      if (tg) {
        tg.HapticFeedback.notificationOccurred("success");
      }
    } else {
      result.textContent = "Ошибка отправки. Попробуйте позже.";
    }
  } catch (error) {
    console.error("Ошибка:", error);
    result.textContent = "Ошибка соединения. Попробуйте позже.";
  }
});
