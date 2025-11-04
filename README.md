# Hostel Hive - Hostel Management System

Hostel Hive is a modern, responsive, and easy-to-use web application designed to streamline the management of a student hostel. Built with React, TypeScript, and Tailwind CSS, this application provides a comprehensive set of features to manage students, rooms, and fees efficiently.

## ✨ Features

### 📊 Interactive Dashboard
Get a quick overview of your hostel's status at a glance. The dashboard provides key metrics, including:
- **Total Students:** The current number of students residing in the hostel.
- **Occupancy Rate:** The percentage of beds that are currently occupied.
- **Rooms Occupied:** A count of occupied rooms versus the total number of rooms.
- **Fees Due:** The number of students with pending fee payments.
- **Recent Check-ins:** A list of the latest students who have checked into the hostel.

### 🧑‍🎓 Student Management (CRUD)
A complete system for managing student records:
- **Add Students:** Easily add new students with details like name, student ID, room number, phone, and check-in date. The form intelligently shows only available rooms.
- **View Students:** See a comprehensive list of all students with their essential details.
- **Edit Students:** Update student information as needed.
- **Delete Students:** Remove student records from the system.

### 🛌 Room Management
Visualize and manage all the rooms in the hostel:
- **Room Overview:** A grid-based view of all rooms, color-coded by their status.
- **Status Tracking:** Each room is clearly marked as **Occupied**, **Vacant**, or under **Maintenance**.
- **Occupancy Details:** See the current number of occupants versus the total capacity for each room.

### 💰 Fee Management
Keep track of student fee payments with ease:
- **Fee Status Tracking:** View a list of all students and their current fee status (**Paid** or **Due**).
- **Filter Options:** Quickly filter the list to see all students, only those who have paid, or only those with outstanding dues.
- **Toggle Status:** Update a student's fee status with a single click.

## 🛠️ Technical Stack

- **Frontend:** [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Persistence:** Browser `localStorage` is used to store all data, ensuring that your changes are saved even after you close the browser tab. This makes the application feel like a real-world product without needing a backend.

## 🚀 Deployment

This application is a fully client-side single-page application (SPA). It is ready to be deployed on any static hosting service like:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
