FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app source
COPY . .

# App port (optional but good practice)
EXPOSE 3000

# Start app
CMD ["npm", "start"]
