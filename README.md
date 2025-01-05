# Setting Up the Backend Locally

## Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB (running locally or accessible via a connection string)

---

## Steps to Run Locally

### 1. **Fork or Clone the Repository**

- **Fork** the repository to your GitHub account or directly clone it using:
  ```bash
  git clone <repository-url>
  ```
- Navigate to the project directory:
  ```bash
  cd <project-folder>
  ```

### 2. **Set Up Environment Variables**

- Copy the `.env.sample` file to create a `.env` file:
  ```bash
  cp .env.sample .env
  ```
- Open the `.env` file and update the variables as needed. For example:
  ```env
  PORT=3000
  MONGO_URI=mongodb://localhost:27017/your-database
  ```

### 3. **Install Dependencies**

- Install all required dependencies by running:
  ```bash
  npm install
  ```

### 4. **Run the Application**

- Start the application in production mode:
  ```bash
  npm run start
  ```

### 5. **Verify Local Setup**

- Open your browser or a tool like Postman and test the API at:
  ```
  http://localhost:<port>
  ```
  - Replace `<port>` with the value specified in your `.env` file (default is `3000`).


---


