# TAMM Blog Fronteng

This is a React blog app created with React.

To run this application, make sure the backend is running on [http://localhost:3000](http://localhost:3000) (The backend repository can be found at [Tamm blog server](https://github.com/BekaHaile/tamm-blog-server)). The backend is required for performing CRUD operations in the app.

Please note that users can only edit or delete blogs that they have created.

The homepage of the app features lazy loading, meaning that blogs load dynamically as the user scrolls.

# Getting Started

To start the app locally, follow these steps:

1. Clone the repository:
     git clone https://github.com/your-username/tamm-blog-frontend.git
2. Navigate to the project directory: 
     cd tamm-blog-frontend
3. Install the dependencies:
    ### `npm install` or `yarn install`
4. Run the app in development mode:
    ### `npm start` or `yarn start`
This will open the app in your browser at [http://localhost:3001](http://localhost:3001).

# Building for Production

To build the app for production, use the following command:
### `npm build`

This will create a build folder with optimized and minified files ready for deployment. The filenames will include hashes for cache busting purposes.

Your app is now ready to be deployed!

This project was bootstrapped with Create React App.
