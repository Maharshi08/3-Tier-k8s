FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependency files first (layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy app source
COPY . .

# App port (adjust if different)
EXPOSE 3000

# Start backend
CMD ["node", "index.js"]
