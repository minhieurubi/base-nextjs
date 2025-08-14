# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port (3000 is default for Next.js)
EXPOSE 3000

# Start the app in production
CMD ["npm", "start"]
