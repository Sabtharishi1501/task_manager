TASK MANAGER
PROJECT DOCUMENTATION & AI USAGE SUMMARY

Graduate Support Engineer Trainee Assessment
Author: Sabtharishi S


==================================================
1. APPLICATION OVERVIEW
==================================================

Task Manager is a simple web-based task management application
developed for the Graduate Support Engineer Trainee Assessment.

The application allows users to:

- Sign in using Google Authentication
- Create tasks
- View tasks
- Update task status

Supported task statuses:

- Planned
- In Progress
- Complete

The application intentionally focuses on the required assessment
scope without adding unnecessary features.


==================================================
2. APPLICATION LINKS
==================================================

Live Application:
https://task-manager-fs-e821.vercel.app/

GitHub Repository:
https://github.com/Sabtharishi1501/task_manager


==================================================
3. HOW TO USE
==================================================

1. Open the live application.
2. Click "Sign in with Google".
3. Select a Google account and complete authentication.
4. After login, create and view tasks from the dashboard.
5. Update a task's status between Planned, In Progress, and Complete.

Tasks are stored in Firebase Firestore.


==================================================
4. FUNCTIONAL REQUIREMENTS
==================================================

Requirement                    Implementation
--------------------------------------------------
Google Authentication          Firebase Authentication
Create tasks                   React + Firestore
View tasks                     React + Firestore
Update task status             React + Firestore
Planned                        Supported
In Progress                   Supported
Complete                      Supported


==================================================
5. TECHNOLOGY STACK
==================================================

- React
- Vite
- JavaScript
- Firebase Authentication
- Firebase Firestore
- Vercel
- GitHub


==================================================
6. IMPORTANT ASSUMPTIONS
==================================================

1. Tasks are associated with the currently authenticated user.
2. Firestore is used so tasks persist after refreshing the browser.
3. Google Authentication is used because it is explicitly required.
4. Only the three statuses specified in the assessment are used.
5. The application is intentionally limited to the required
   task-management workflows.


==================================================
7. KNOWN LIMITATIONS
==================================================

- Google Authentication is the supported login method.
- Advanced features such as task sharing, reminders, recurring
  tasks, and file attachments are not included.
- The application depends on Firebase services.
- Internet connectivity is required for Firebase-backed operations.


==================================================
8. IMPORTANT NOTES
==================================================

The production Vercel domain must be added to Firebase Authentication's
Authorized Domains:

task-manager-fs-e821.vercel.app

Firebase configuration is supplied through environment variables.

The .env file must not be committed to GitHub.

Example:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id


==================================================
9. LOCAL SETUP
==================================================

Prerequisites:

- Node.js
- npm
- Git

Clone the repository:

git clone https://github.com/Sabtharishi1501/task_manager.git

cd task_manager

Install dependencies:

npm install

Create a .env file with the Firebase configuration values.

Run locally:

npm run dev

Build for production:

npm run build


==================================================
10. DEPLOYMENT
==================================================

The application is deployed using Vercel.

Build configuration:

Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install

Firebase environment variables are configured in Vercel.


==================================================
11. TESTING
==================================================

The following core workflows were manually tested:

- Google sign-in
- Task creation
- Viewing tasks
- Updating task status
- Task persistence
- Production deployment
- Google authentication on the deployed domain


==================================================
12. AI USAGE SUMMARY
==================================================

AI tools were used as development assistants for planning, coding,
debugging, Firebase configuration, deployment guidance, and
documentation.

AI Tools Used:

1. Claude
   - React development
   - Component and UI generation
   - Firebase integration
   - Debugging and code refinement

2. ChatGPT
   - Requirement analysis
   - Architecture and technology guidance
   - Firebase setup and troubleshooting
   - Vercel deployment guidance
   - Documentation preparation


==================================================
14. AI-GENERATED CODE AND MANUAL WORK
==================================================

AI was used to assist with React components, Firebase integration,
authentication logic, Firestore interaction, UI implementation,
and debugging.

AI-generated code was reviewed and tested manually.

Manual work included:

- Firebase project configuration
- Google Authentication setup
- Firestore configuration
- Environment variable configuration
- Vercel deployment
- Firebase Authorized Domain configuration
- Functional testing
- Debugging and final verification


==================================================
15. RESPONSIBLE AI USAGE
==================================================

AI suggestions were treated as assistance rather than automatically
correct solutions.

The implementation was reviewed and tested against the assessment
requirements. Errors were investigated and appropriate changes were
made manually.

The final application was configured, tested, and deployed with
human review and control.


==================================================
16. SUBMISSION
==================================================

GitHub:
https://github.com/Sabtharishi1501/task_manager

Live Application:
https://task-manager-fs-e821.vercel.app/

Documentation:
This document

AI Usage:
Included in this document



AUTHOR
Sabtharishi S
