#!/bin/bash

# Function to create the subgraph
create_subgraph() {
  echo "Creating subgraph..."
  graph create --node http://localhost:8020/ drex
}

# Function to deploy the subgraph
deploy_subgraph() {
  echo "Deploying subgraph..."
  graph deploy \
    --node http://localhost:8020/ \
    --ipfs http://localhost:5001/ \
    drex
}

# Main function to run the script
main() {
  echo "Starting thegraph..."
  create_subgraph
  sleep 3
  deploy_subgraph
  echo "Subgraph 'drex' has been created and deployed successfully."
}

# Execute the main function
main
