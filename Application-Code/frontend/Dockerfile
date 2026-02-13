FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production
RUN npm install -g serve

# Copy app source
COPY . .

# App port (optional but good practice)
EXPOSE 3000

# Build at container start (so REACT_APP_* env is picked up) and serve static assets.
CMD ["sh", "-c", "NODE_OPTIONS=--openssl-legacy-provider npm run build && serve -s build -l 3000"]
