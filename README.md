# Next.js App

This is a Next.js application. Follow the instructions below to run it locally and inside a Docker container.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Docker](https://www.docker.com/)

## Running Locally

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

3. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Running with Docker

### Build the Docker Image

1. Build the Docker image:
   ```sh
   docker build -t my-nextjs-app .
   ```

### Run the Docker Container

2. Run the container and expose it on port 3000:
   ```sh
   docker run -p 3000:3000 my-nextjs-app
   ```

3. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Additional Commands

- To stop the running container, find its container ID with:
  ```sh
  docker ps
  ```
  Then stop it using:
  ```sh
  docker stop <container_id>
  ```

- To remove the container:
  ```sh
  docker rm <container_id>
  ```

- To remove the Docker image:
  ```sh
  docker rmi my-nextjs-app
  ```

