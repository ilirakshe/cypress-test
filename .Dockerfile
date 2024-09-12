# Use an official Cypress image with Node.js, Cypress, and browsers pre-installed
FROM cypress/included:12.7.0

# Set the working directory
WORKDIR cypress/e2e

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install Node.js dependencies without Cypress (since it's already included in the base image)
RUN npm install --omit=dev --no-optional

# Copy the entire project directory to the Docker container
COPY . .

# Run Cypress verify to make sure everything is set up correctly
RUN npx cypress verify

# Define the command to run your Cypress tests
CMD ["npx", "cypress", "run"]
