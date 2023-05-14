# Kanban Project

A Kanban board project that helps you manage tasks and workflows effectively.


## Project Overview

The Kanban Project is a web-based application that implements the Kanban methodology for managing tasks. It provides a visual representation of workflows using boards, columns, and cards. Each card represents a task that can be moved across columns to indicate its progress.

The main goal of this project is to help individuals or teams organize their work, track progress, and collaborate efficiently.

## Features

- Create multiple boards to manage different projects or workflows.
- Add custom columns to each board to reflect your specific workflow stages.
- Create, edit, and delete cards within each column to represent tasks.
- Drag and drop cards across columns to update their status or progress.
- Assign labels, due dates, and priorities to cards for better organization.
- Collaborate with team members by sharing boards and assigning tasks.


## Installation

To run the Kanban Project locally, follow these steps:

1. Clone the repository:

  ```bash
  git clone https://github.com/Darshan4943/Project-4.git

2. Install node modules.
3. npm start

 

## Data Structure

const boardData = {
  title: 'Home Task Management',
  columns: [
    {
      id: 1,
      title: 'To Do',
      tasks: [
        { id: 1, title: 'CodeZinger', description: 'Coding labs for computer science students' },
        { id: 2, title: 'Bonus Project', description: 'Create Online Exam Portal' }
      ]
    },
    {
      id: 2,
      title: 'Progress',
      tasks: [
        { id: 3, title: 'HireFlix Interview', description: 'JS mock interview' },
        { id: 4, title: 'Project4', description: 'Work in progress' }
      ]
    },
    {
      id: 3,
      title: 'Done',
      tasks: [
        { id: 5, title: 'CodeWars', description: 'Solved 5 JS DSA questions' },
        { id: 6, title: 'HackerEarth', description: 'Earned JS batch by solving DSA questions' }
      ]
    }
  ]
};




