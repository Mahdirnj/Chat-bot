const messagesContainer = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // نمایش پیام کاربر
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'user-message';
    userMessageElement.textContent = userMessage;
    messagesContainer.appendChild(userMessageElement);

    // پاک کردن ورودی
    userInput.value = '';

    // دریافت پاسخ از بک‌اند
    const botResponse = await getBotResponse(userMessage);

    // نمایش پیام چت‌بات
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'bot-message';
    botMessageElement.textContent = botResponse;
    messagesContainer.appendChild(botMessageElement);

    // اسکرول به انتهای پیام‌ها
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// ارسال درخواست به بک‌اند
async function getBotResponse(userMessage) {
    try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
        return data.reply; // پاسخ از سمت سرور
    } catch (error) {
        return 'Error: Unable to fetch the response. Please try again.';
    }
}
