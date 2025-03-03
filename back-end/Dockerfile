# Sử dụng image Node.js chính thức
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Cài đặt các thư viện hệ thống cần thiết (nếu có dùng canvas)
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    python3 \
    python3-pip \
    pkg-config

# Cài đặt yt-dlp bằng pip để đảm bảo phiên bản mới nhất
RUN pip install --upgrade yt-dlp --break-system-packages


# Cài đặt nodemon để hỗ trợ hot reload
RUN npm install -g nodemon

# Sao chép package.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cấu hình cổng
EXPOSE 5000

# Lệnh chạy ứng dụng với nodemon
CMD ["npm", "run", "start:dev"]
