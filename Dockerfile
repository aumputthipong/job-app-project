# Use an official Node.js runtime as a parent image
FROM node:current-alpine

# Install Expo CLI globally
RUN npm install -g expo-cli

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN npm install

# Copy the entire app directory to the working directory
COPY . .

# Expose port 19000 for Expo development server
EXPOSE 19000

# Start the Expo development server
CMD ["expo", "start"]
