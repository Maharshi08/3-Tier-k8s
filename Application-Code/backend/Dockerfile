FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependency files first (layer caching)
COPY --chown=node:node package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy app source
COPY --chown=node:node . .

# Run as non-root user
USER node

# App port (adjust if different)
EXPOSE 3500

# Start backend
CMD ["node", "index.js"]
