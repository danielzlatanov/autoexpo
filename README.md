# AutoExpo Backend API

🚗 **Welcome to the AutoExpo backend API documentation!**

AutoExpo is a multi-page application (MPA) that serves as both the backend and frontend, providing dynamic HTML pages using Handlebars to showcase a diverse collection of cars and car-related information.

## 📂 Application Structure

AutoExpo is organized into several key components:

- **Config**: Contains configuration files for database (MongoDB) setup, Express.js, and routing.
- **Controllers**: Houses the controllers responsible for handling different routes and functionalities, including authentication, car management, catalog display, user registration, and more.
- **Middlewares**: Includes middleware functions for tasks like authentication, setting default page titles, guarding routes, and managing user navigation.
- **Models**: Defines data models for cars, extras, and users.
- **Services**: Contains service modules responsible for handling authentication, car-related operations, and more.
- **Static**: Stores static assets such as images and the `styles.css` file.
- **Utils**: Contains utility functions, including error parsing.

## 🌐 Views

AutoExpo utilizes Handlebars (HBS) templates for rendering dynamic HTML pages. The `views` directory consists of various HBS templates, including layouts, partials, and individual page templates such as the catalog, car details, user registration, and more.

## 🚀 Getting Started

To run the AutoExpo backend API, follow these steps:

1. Clone the repository to your local machine.

2. Install the required dependencies by running:

   ```bash
   npm install
   ```

3. Start the server using the following command:

   ```bash
   npm start
   ```

4. The server will start listening on port 3000. Open your web browser and go to http://localhost:3000/ to access the frontend of the application.

## 🔑 Key Features

AutoExpo's backend API offers the following key features:

- **Multi-Page Application**: AutoExpo is a multi-page application, providing a seamless experience for users to explore a wide range of cars and related information.

- **Dynamic HTML Rendering**: The API utilizes Handlebars templates to render dynamic HTML pages, allowing for flexibility in content presentation.

- **Car Management**: Users can access, edit, and delete car listings, making it a comprehensive platform for car enthusiasts. Additionally, administrators have the privilege to create car extras, enhancing the platform's functionality for managing car-related information.

- **User Registration**: The API supports user registration, enabling users to create accounts and interact with the application as registered members.

- **Authentication**: Robust authentication mechanisms are in place to ensure secure access to protected routes and functionalities.

## 🛣️ API Routes

AutoExpo defines various API routes and controllers to handle different functionalities:

- **Home Controller**: _Manages routes for the home and about pages. This route does not require any special permissions to be accessed. It's open to all users._

  - **/** - GET route for the home page.
  - **/about** - GET route for the about page.

- **Auth Controller**: _Manages user authentication and registration routes. The authentication route is accessible to all guests and does not require any specific permissions._

  - **/auth/login** - GET and POST routes for user login.
  - **/auth/register** - GET and POST routes for user registration.
  - **/auth/logout** - GET route for user logout.

- **Car Controller**: _Handles routes related to car management. The car route is accessible to all users and does not require any specific permissions._

  - **/car/edit/:id** - GET and POST routes for editing car details.
  - **/car/delete/:id** - GET and POST routes for deleting cars.

- **Catalog Controller**: _Manages routes for accessing the car catalog. The catalog route is open to all users and does not require any specific permissions._

  - **/catalog** - GET route for browsing and searching cars.
  - **/catalog/:id** - GET route for viewing car details.

- **Create Controller**: _Provides routes for creating new car listings. To access the create route, user authentication is required. Users need to be logged in to use this functionality._

  - **/create/car** - GET and POST routes for creating new car listings.

- **Extra Controller**: _Handles routes related to car extras. The extra route has two functionalities:_

  _**Create**_: To access the create extras functionality, users need to have an "admin" role. This means they must be administrators to view the page and add new car extras to the database.

  - **/create/car-extras** - GET and POST routes for adding car extras.

  _**Edit**_: To access the edit car extras functionality, user authentication is required. Additionally, the user must be the owner of the car associated with the extras they want to edit.

  - **/edit/:carId/car-extras** - GET and POST routes for modifying car extras.

- **Default Controller**: _Handles errors and renders the 404.hbs template when a route is not found or errors occur during processing. This ensures a user-friendly error page is displayed in such cases._
