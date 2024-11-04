# Real-Time Chat Application

This is a real-time chat application that enables users to communicate with each other instantly. The application is built with a full stack approach using a variety of modern technologies for efficient communication, authentication, and user management.

## Features

- Real-time messaging using **Socket.IO**
- User authentication with **JWT (JSON Web Token)**
- Password hashing with **bcrypt**
- Image storage on **Cloudinary**
- Google Cloud authentication for easy user sign-ins
- Frontend built with **React** and styled with **Tailwind CSS**
- Global state management with **Zustand**
- Component library integration with **ShadCN**
- Icons from **React Icons**

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Zustand**: Lightweight state management for efficient and simple global state handling.
- **ShadCN**: A component library for reusable and responsive components.
- **React Icons**: Icon library for a variety of icons.
- **Tailwind CSS**: For styling and responsive design.

### Backend
- **Node.js**: Backend framework to handle server-side operations.
- **Express.js**: Simplifies routing and middleware handling.
- **Socket.IO**: Provides real-time communication between server and client.
- **MongoDB**: Stores user data, chat history, and other persistent data.
- **Cloudinary**: Manages image storage and delivery.
- **bcrypt**: Hashes passwords for secure storage.
- **JSON Web Token (JWT)**: Used for user authentication and secure access.

### Cloud Authentication
- **Google Cloud Authentication**: For secure and easy third-party sign-in.

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed.
- MongoDB server or access to a MongoDB cloud database.
- Cloudinary account for image storage.
- Google Cloud project set up for Google authentication.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/chat-application.git
    cd chat-application
    ```

2. **Install server dependencies**:
    ```bash
    npm install
    ```

3. **Install client dependencies**:
    ```bash
    cd client
    npm install
    ```

4. **Set up environment variables**:
   - Create a `.env` file in the root and add configurations for MongoDB, Cloudinary, JWT secret, and Google Cloud credentials.

5. **Run the application**:
    ```bash
    npm run dev
    ```

## Usage

- Register a new account or log in with Google Cloud authentication.
- Start a real-time chat with other registered users.
- Upload profile pictures and manage account settings.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Socket.IO](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Google Cloud Authentication](https://cloud.google.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

Feel free to contribute and open issues if you have any ideas for improvement!
