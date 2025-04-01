# Use Node.js as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js app
RUN NEXT_DISABLE_ESLINT=1 npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
