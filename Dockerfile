# Use official Node.js LTS Alpine image (small and efficient)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the port your app listens on (default 3000, change if needed)
EXPOSE 3001

# Start your app
CMD ["node", "index.js"]
