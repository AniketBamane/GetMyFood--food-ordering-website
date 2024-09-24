<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GetMyFood - README</title>
</head>

<body>

  <h1 align="center">GetMyFood 🍽️</h1>

  <p align="center">
    <strong>Buy your favorite food dishes from top restaurants, and for restaurant owners, manage your restaurant and
      orders with ease!</strong>
  </p>

  <hr>

  <h2>🚀 About the Project</h2>

  <p><strong>GetMyFood</strong> is a MERN stack-based application that allows users to browse through various
    restaurants, add food items to the cart, and place orders. It also empowers restaurant owners to:</p>
  <ul>
    <li>Create their restaurant profile.</li>
    <li>Add and manage food dishes (menu).</li>
    <li>Manage customer orders.</li>
  </ul>

  <hr>

  <h2>🛠️ Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React, Shadcn UI, Zustand (State Management)</li>
    <li><strong>Backend:</strong> Node.js, Express.js, MongoDB, Nodemailer for transactional emails</li>
    <li><strong>Styling:</strong> Tailwind CSS</li>
    <li><strong>Testing:</strong> Postman for backend API testing and manual testing for the frontend.</li>
  </ul>

  <hr>

  <h2>🎯 Features</h2>
  <p><strong>Users:</strong></p>
  <ul>
    <li>Browse restaurants and food menus.</li>
    <li>Add dishes to cart and place orders.</li>
  </ul>

  <p><strong>Restaurant Owners:</strong></p>
  <ul>
    <li>Create and manage restaurant profiles.</li>
    <li>Add and edit food items in the menu.</li>
    <li>Manage customer orders in real-time.</li>
  </ul>

  <hr>

  <h2>📧 Email Notifications</h2>
  <p>The application uses <strong>Nodemailer</strong> for email notifications, allowing users to receive confirmations
    and updates about their orders.</p>

  <hr>

  <h2>📦 Installation & Setup</h2>
  <ol>
    <li><strong>Clone the Repository:</strong>
      <pre><code>git clone https://github.com/yourusername/getmyfood.git</code></pre>
    </li>

    <li><strong>Install Dependencies:</strong>
      <pre><code>cd getmyfood<br>npm install</code></pre>
    </li>

    <li><strong>Set up Environment Variables:</strong> Create a <code>.env</code> file in the root directory and add the required environment variables:
      <pre><code>MONGO_URI=your-mongo-db-uri<br>JWT_SECRET=your-jwt-secret<br>EMAIL_USER=your-email-user<br>EMAIL_PASS=your-email-password</code></pre>
    </li>

    <li><strong>Run the Application:</strong>
      <pre><code>npm start</code></pre>
    </li>
  </ol>

  <hr>

  <h2>🧪 Testing</h2>
  <p><strong>Backend:</strong> Tested using Postman to ensure API routes are functioning correctly.</p>
  <p><strong>Frontend:</strong> Manually tested by interacting with the UI to ensure a smooth user experience.</p>

  <hr>

  <h2>🤝 Contributing</h2>
  <p>Feel free to submit issues or pull requests if you would like to contribute to <strong>GetMyFood</strong>.</p>

  <hr>

  <h2>🌐 Live Demo</h2>
  <p>Check out the live demo of the application <a href="#">here</a>.</p>

</body>

</html>
