FROM node:22.16.0-alpine3.22

#working directory
WORKDIR /app 

# copy the package.json file
COPY package*.json ./
RUN npm install

# Copy rest of the code 
COPY . .

# Expose the port your app runs on -> we have set port to 3000
EXPOSE 3000

# Default cmd
CMD ["node", "src/server.js"]
