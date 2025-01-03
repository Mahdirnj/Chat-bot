# استفاده از تصویر پایه Node.js
FROM node:18

# تنظیم مسیر کاری
WORKDIR /app

# کپی فایل‌های مورد نیاز
COPY package*.json ./
RUN npm install

COPY . .

# باز کردن پورت
EXPOSE 5000

# دستور شروع
CMD ["npm", "start"]
