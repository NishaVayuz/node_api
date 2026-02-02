# 1️⃣ Base image
FROM node:24

# 2️⃣ Working directory
WORKDIR /app

# 3️⃣ Copy package files
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy source code
COPY . .

# 6️⃣ Expose port
EXPOSE 8000

# 7️⃣ Start app
CMD ["npm", "start"]
