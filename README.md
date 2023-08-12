# SenseAI-Assignment
			   

Introduction 
This project implements an authentication flow with separate roles for admins and users. It includes features such as admin login, user login, user signup link requesting, user registration, admin unique link generation, and dashboards for both roles. The system is built using Express for the backend and React for the frontend, with MongoDB and Mongoose for the database, and a JWT-based approach for authentication. 
You can access the hosted version of the application at https://senseai-4fc46.web.app


Prerequisites
Node.js (v18.14.0) 
Express(v4.18.2) 
npm (v18.14.0) 
MongoDB database 

Getting Started 
Follow these steps to set up the development environment and run the project locally. 

Clone the Repository 
https://github.com/Rahulck43/SenseAI-Assignment.git 

Backend Setup 
cd SERVER 
npm install 
 
Setup Environment Variables 
Create the .env file in the root directory 
. Open the ‘.env’ file and populate it with the following values: 

MONGOOSE_CONNECTION_STRING = "<your-mongodb-connection-string>" 
JWT_KEY = "<your-secret-jwt-key>" 
SIGNUP_URL = "https://example.com/signup" 
CLOUDINARY_CLOUD_NAME = "<your-cloudinary-cloud-name>" 
CLOUDINARY_API_KEY = "<your-cloudinary-api-key>" 
CLOUDINARY_API_SECRET = "<your-cloudinary-api-secret>" 
GMAIL_USER = "<your-gmail-username>" 
GMAIL_PASSWORD = "<your-gmail-password>" 

Frontend Setup 
cd UI 
npm install 

Base Url Setup 
cd UI/src/utils/apiInstance.js 
Change the base url to your server base url 

Database Setup 
Required collections and schemas are already defined. Just need to setup the mongo dB connection string in .env file. on successful connection with database, “connected to mongo dB atlas” will be logged.Make sure you are connected with internet. 


Running the Application 
Start the backend server: 
cd SERVER 
npm start 
The backend server will be accessible at http://localhost:5000 

Start the frontend development server: 
cd UI 
npm run dev 
The frontend development server will be accessible at http://localhost:5173 


Usage 

Admin Login :
Navigate to http://localhost:5173/admin 
Enter your admin credentials (username and password). 
Upon successful login, you'll be redirected to the admin dashboard. 
Here admin can manage users and provide signup link 

User Login :
Navigate to https://senseai-4fc46.web.app 
Enter your user credentials (email and password). 
Upon successful login, you'll be redirected to the user dashboard. 

User Registration :
If you do not have an access token, you cannot directly sign up. 
Instead, you will be redirected to the access request page. 
On the access request page, provide your email address. 
Submit the request. 
The admin will review the requests and send you an invite link via email. 
Check your email for the invite link. 
Click on the invite link to access the signup page. 
Fill out the required registration details, including email and a secure password. 
Submit the registration form. 
The invite link is now used and cannot be used again for registration. 

Admin DashBoard :
All users are listed in admin dashboard 
Click on the delete icon and confirm to delete a user from the database. 
Click on the view requests button to view access token requests 
Click send icon to send signup link to their email 

User DashBoard :
Here user can view their profile 
Click on edit profile button to navigate to edit profile page 
Upon submitting the edit profile form, user profile will be edited and redirected back to profile page 

 

 


