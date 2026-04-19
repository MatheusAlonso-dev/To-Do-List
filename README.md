# To-Do List

A simple task management application that allows users to create, update, and delete tasks.

## Purpose

This project was developed as part of my learning journey in software development, focusing on server development and CRUD operations.

## Features

- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed

## Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express (backend framework)
- MySQL

## Database Structure

Table: tasks

- id (INT, PRIMARY KEY)
- title (VARCHAR)
- description (TEXT)
- priority (ENUM: low, medium, high)
- status (ENUM: pending, completed)

## Requirements

- Node.js installed
- MySQL installed and running

## How to Run

1. Install dependencies:
   npm install

2. Configure the database (MySQL)

3. Start the server:
   node server.js

## Project Structure

project-root/
├── public/
│ ├── index.html
│ ├── script.js
│ └── style.css
├── server.js
├── package.json
├── package-lock.json
└── README.md

## Author

Matheus Alonso