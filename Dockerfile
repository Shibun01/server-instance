FROM node:18.18.0-alpine

# Working Directory
WORKDIR /usr/src/app


# Copy package.json and package-lock.json to destination
COPY package*.json ./


# Install dependencies
RUN npm install 


# Copy the rest of the application code
COPY . .


ENV MONGODB_URI='mongodb+srv://Shibun:Shibun7459@mongo-db.eorrjea.mongodb.net'
ENV CORS_ORIGIN='*'
ENV PORT=8000
ENV JWT_SECRET='test123'
ENV DB_NAME='coffee_shop_finder'

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["node", "index.js"]