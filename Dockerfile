# เลือกภาพของ Node ที่เหมาะสม
FROM node:14

# ตั้งค่าตำแหน่งที่จะทำงานใน Docker
WORKDIR /app

# คัดลอก package.json และ package-lock.json เพื่อตรวจสอบและติดตั้ง dependencies
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกทุกไฟล์ที่เกี่ยวข้อง
COPY . .

# สร้าง build ของโปรเจค React Native
RUN npx expo build:web

# ระบุไพล์ที่ต้องการให้เป็นที่เข้าถึง
EXPOSE 19006

# เริ่มต้นแอปพลิเคชัน
CMD ["npm", "start"]
