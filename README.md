# major-project
I created a simple server-side rendering website that implements a login and logout feature for users using Passport.js. To store user passwords, I utilized cookies, allowing users to remain logged in for a specific period without needing to re-authenticate.

For the server-side rendering, I employed Express.js. To store user data, I utilized MongoDB, which provides better performance. Specifically, I used MongoAtlas to store data.

To create different pages for the website, I utilized EJS Templates. For styling, I used Bootstrap. To maintain a better structure of code, I implemented the MVC framework.

One of the key features of the website is the map feature, which I achieved by integrating the Mapbox API to render maps on all listing pages.

To store images, I utilized the Cloudinary API. For schema validation, I used the Joi library. To secure different passwords and API keys, I employed dotenv.

Finally, to ensure strong password security, I implemented salting and hashing.

Here is a concise summary of the technologies and features used in the project:

Server-side rendering: Express.js
Database: MongoDB (with MongoAtlas)
Template engine: EJS
Styling: Bootstrap
Framework: MVC
Map integration: Mapbox API
Image storage: Cloudinary API
Schema validation: Joi
Security: dotenv, salting, and hashing
Authentication: Passport.js with sessions and cookies