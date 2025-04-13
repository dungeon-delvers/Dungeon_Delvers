# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose port 4002
EXPOSE 4002

# Start the Node.js server
CMD ["npm", "run", "start"]