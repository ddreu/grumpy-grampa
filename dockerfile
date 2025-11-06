# 1️ Base image: Node.js environment
FROM node:20-alpine

# 2️ Set working directory inside container
WORKDIR /app

# 3️ Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# 4️ Install dependencies (includes Next.js)
RUN npm install

# 5️ Copy the rest of the app code into the container
COPY . .

# 6️ Build the Next.js app
RUN npm run build

# 7️ Expose port 3000 (default for Next.js)
EXPOSE 3000

# 8️ Start the app
CMD ["npm", "start"]
