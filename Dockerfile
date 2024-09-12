# official Cypress image with Node.js, Cypress, and browsers pre-installed
FROM cypress/included:12.7.0

# Set the working directory
WORKDIR cypress/e2e

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire project directory to the Docker container
COPY . .

# Verify that Cypress is installed and working
RUN npx cypress verify

# Define the command to run your Cypress tests
CMD ["npx", "cypress", "run"]
