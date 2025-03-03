# Sử dụng image Node.js chính thức
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cấu hình cổng
EXPOSE 3000

# Chạy ứng dụng React với chế độ hot reload
CMD ["npm", "start"]
