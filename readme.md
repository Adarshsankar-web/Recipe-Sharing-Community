# Recipe Sharing Community
A full-stack MERN web application that allows users to share, manage, and explore delicious recipes.

## Features
- User Registration & Login (JWT Authentication)
- Protected Routes
- Add Recipes
- Edit Recipes
- Delete Recipes
- Upload Recipe Images
- Search Recipes
- Filter by Category
- Sort by Rating or Newest
- View Recipe Details
- Responsive User Interface
- Loading Spinner
- Beautiful Modern Design

## 🛠 Tech Stack
### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Upload)

---

## Project Structure

client/
- src/
- components/
- pages/
- services/
- styles/

server/
- config/
- controllers/
- middleware/
- models/
- routes/
- uploads/
---
## Installation
### Clone Repository

```bash
git clone <repository-url>
```

### Install Frontend
```bash
cd client
npm install
npm run dev
```

### Install Backend
```bash
cd server
npm install
node index.js
```
---

## 🔐 Environment Variables
Create a `.env` file inside the server folder.
```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```
## Author
**Adarsh Sankar**
B.Tech Computer Science Engineering

## License
This project is developed for educational purposes.