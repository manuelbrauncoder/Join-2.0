import { Injectable } from '@angular/core';
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  
  exampleTasks: Task[] = [
    {
      "title": "Develop New Authentication System",
      "description": "Implement a new authentication system with multi-factor authentication.",
      "subtasks": [
        { "title": "Research authentication methods", "done": false },
        { "title": "Design user flow", "done": true }
      ],
      "assignedTo": ["Elon Musk", "Tim Cook"],
      "priority": "urgent",
      "dueDate": 1693891200000,
      "category": "Technical Task"
    },
    {
      "title": "Design Landing Page",
      "description": "Create a modern, responsive landing page for the new product.",
      "subtasks": [
        { "title": "Create wireframes", "done": true },
        { "title": "Develop HTML/CSS", "done": false },
        { "title": "Integrate with backend", "done": false }
      ],
      "assignedTo": ["Bill Gates"],
      "priority": "medium",
      "dueDate": 1694486400000,
      "category": "User Story"
    },
    {
      "title": "Optimize Database Performance",
      "description": "Improve the performance of the database by indexing key tables.",
      "subtasks": [
        { "title": "Identify slow queries", "done": false },
        { "title": "Implement indexing", "done": false }
      ],
      "assignedTo": ["Jeff Bezos", "Larry Page"],
      "priority": "urgent",
      "dueDate": 1695177600000,
      "category": "Technical Task"
    },
    {
      "title": "User Feedback Analysis",
      "description": "Collect and analyze user feedback from the latest release.",
      "subtasks": [],
      "assignedTo": ["Mark Zuckerberg", "Susan Wojcicki", "Sheryl Sandberg"],
      "priority": "medium",
      "dueDate": 1695772800000,
      "category": "User Story"
    },
    {
      "title": "Implement New Payment Gateway",
      "description": "Integrate a new payment gateway with support for multiple currencies.",
      "subtasks": [
        { "title": "Research available gateways", "done": true },
        { "title": "Develop API integration", "done": false }
      ],
      "assignedTo": ["Sundar Pichai", "Jack Dorsey"],
      "priority": "urgent",
      "dueDate": 1696281600000,
      "category": "Technical Task"
    },
    {
      "title": "Set Up Continuous Integration",
      "description": "Establish a continuous integration pipeline for automated testing.",
      "subtasks": [
        { "title": "Choose CI tool", "done": true },
        { "title": "Configure CI environment", "done": false }
      ],
      "assignedTo": ["Satya Nadella"],
      "priority": "medium",
      "dueDate": 1696896000000,
      "category": "Technical Task"
    },
    {
      "title": "Marketing Campaign for New Feature",
      "description": "Plan and execute a marketing campaign for the new product feature.",
      "subtasks": [
        { "title": "Develop marketing strategy", "done": false },
        { "title": "Create ad creatives", "done": false },
        { "title": "Schedule social media posts", "done": false }
      ],
      "assignedTo": ["Reed Hastings", "Marissa Mayer"],
      "priority": "medium",
      "dueDate": 1697500800000,
      "category": "User Story"
    },
    {
      "title": "Refactor Legacy Codebase",
      "description": "Refactor the legacy codebase to improve maintainability and performance.",
      "subtasks": [],
      "assignedTo": ["Steve Jobs"],
      "priority": "low",
      "dueDate": 1698105600000,
      "category": "Technical Task"
    },
    {
      "title": "Customer Satisfaction Survey",
      "description": "Design and distribute a customer satisfaction survey for feedback.",
      "subtasks": [
        { "title": "Draft survey questions", "done": true },
        { "title": "Distribute survey", "done": false }
      ],
      "assignedTo": ["Sheryl Sandberg"],
      "priority": "medium",
      "dueDate": 1698710400000,
      "category": "User Story"
    },
    {
      "title": "Data Migration to New Server",
      "description": "Migrate all user data to the new, more powerful server.",
      "subtasks": [
        { "title": "Backup current data", "done": true },
        { "title": "Transfer data to new server", "done": false }
      ],
      "assignedTo": ["Larry Page", "Sergey Brin"],
      "priority": "urgent",
      "dueDate": 1699315200000,
      "category": "Technical Task"
    },
    {
      "title": "User Interface Redesign",
      "description": "Redesign the user interface to improve user experience.",
      "subtasks": [
        { "title": "Collect user feedback", "done": true },
        { "title": "Create new UI mockups", "done": false }
      ],
      "assignedTo": ["Susan Wojcicki"],
      "priority": "urgent",
      "dueDate": 1699920000000,
      "category": "User Story"
    },
    {
      "title": "Security Audit",
      "description": "Conduct a full security audit of the application.",
      "subtasks": [
        { "title": "Review access logs", "done": false },
        { "title": "Update security protocols", "done": false }
      ],
      "assignedTo": ["Jeff Bezos", "Bill Gates"],
      "priority": "urgent",
      "dueDate": 1700524800000,
      "category": "Technical Task"
    },
    {
      "title": "Cloud Migration Plan",
      "description": "Develop a plan to migrate the infrastructure to the cloud.",
      "subtasks": [],
      "assignedTo": ["Sundar Pichai", "Satya Nadella"],
      "priority": "medium",
      "dueDate": 1701129600000,
      "category": "Technical Task"
    },
    {
      "title": "Develop AI Recommendation System",
      "description": "Build an AI-based recommendation system for personalized user experience.",
      "subtasks": [
        { "title": "Research AI models", "done": false },
        { "title": "Develop prototype", "done": false }
      ],
      "assignedTo": ["Elon Musk", "Larry Page", "Sergey Brin"],
      "priority": "urgent",
      "dueDate": 1701734400000,
      "category": "Technical Task"
    },
    {
      "title": "Customer Onboarding Process",
      "description": "Create a seamless onboarding process for new customers.",
      "subtasks": [
        { "title": "Map customer journey", "done": true },
        { "title": "Develop onboarding content", "done": false }
      ],
      "assignedTo": ["Mark Zuckerberg", "Reed Hastings"],
      "priority": "medium",
      "dueDate": 1702339200000,
      "category": "User Story"
    }
  ];
  
  constructor() { }

}
