
# angkasa-ticketing-app
<div align="center"><img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/src/assets/logo.svg" alt='logo ankasa'/></div>

<hr/>

## General Information
### Build with
<ul>
  <li><a href='https://html5.org/'>HTML 5</a></li>
  <li><a href='https://www.w3.org/Style/CSS/Overview.en.html'>CSS</a></li>
  <li><a href='https://www.javascript.com/'>JavaScript</a></li>
  <li><a href='https://nodejs.org/en/'>NodeJS</a></li>
  <li><a href='https://reactjs.org/'>React JS (for frontend)</a></li>
  <li><a href='https://expressjs.com/'>Express JS (for backend)</a></li>
</ul>

### Structure Folder 

<p>Backend</p>
<ul>
  <li>public</li>
  <ul>
    <li>img <span><b><i>image public access</i></b></span></li>
  </ul>
  <li>src</li>
  <ul>
    <li>config ||<span><b><i>You can put database configuration in here</i></b></span></li>
    <li>controller ||<span><b><i>This folder for the logic componenent of API</i></b></span></li>
    <li>helper ||<span><b><i>This folder is used to help improve the logic of the controller, for example, response alignment.</i></b></span></li>
    <li>middleware ||<span><b><i>Middleware is used as a bridge during the routes API, for example, uploading images.</i></b></span></li>
    <li>model ||<span><b><i>Models are used to give commands to database manipulation, as in the crud example.</i></b></span></li>
    <li>router ||<span><b><i>The router is the place to set the endpoint for the API.</i></b></span></li>
  </ul>
  <li>index.js || <span><b><i>You can setup this application in this file, such as set port, set another library, and other.</i></b></span></li>
</ul>
<hr/>
<p>Frontend</p>
<a href="https://github.com/ainurcoding/angkasa-ticketing-app">Visit frontend repository</a>
<ul>
  <li>public || <span><b><i>You can drop anything if that is accesseble for public</i></b></span></li>
  <li>src</li>
  <ul>
    <li>assets ||<span><b><i>You can store various needs for this website, such as images, styles, javascript, and others.</i></b></span></li>
    <li>components ||<span><b><i>This folder is for storing layouts, such as Navbar.</i></b></span></li>
    <li>views ||<span><b><i>This folder is the main folder in the website display for this application.</i></b></span></li>
    <li>redux ||<span><b><i>Redux to set the global state, as well as the use of user data.</i></b></span></li>
    <li>router ||<span><b><i>The router is used to set the endpoint of this application.</i></b></span></li>
  </ul>
</ul>
<hr/>

### Installation Guide
<p>Backend</p>
<ol type="1">
  <li>Your first step is to add the .env settings contained in the backend folder, with the examples contained in the .env-example.</li>
  <li>Continue with database creation.</li>
  <li>You can first import the postman documentation contained in this repo and pay attention to the fields in each POST request.
</li>
  <li>To run the server that has been set, use the <b>npm run dev command</b>.</li>
  <li>When there is a description of the Server running on Port (with the port you have specified), the API is ready to use.</li>
</ol>
<hr />
<p>Frontend</p>
<ol type="1">
  <li>Make sure your backend is ready to use, and the backend server is running.</li>
  <li>Set .env in the frontend folder to be your backend URL for example, your backend server is: <b>'localhost:5000'</b>.</li>
  <li>Run the front-end server with the command npm run start on Shell / Git Bash.</li>
  <li>To run the server that has been set, use the <b>npm run dev command</b>.</li>
  <li>If the website page has appeared, then the front end is ready to use.</li>
</ol>
<hr />

### Screenshot Application
<details>
  <summary>
    Login Page
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/login%20page.png" alt="login Page" />
</details>
<details>
  <summary>
    Register Page
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/regist%20page.png" alt="login Page" />
</details>
<details>
  <summary>
    Landing Page
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/landing%20page.png" alt="login Page" />
</details>
<details>
  <summary>
    Find ticket page
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/find%20my%20ticket%20page.png" alt="login Page" />
</details>
<details>
  <summary>
    Flight booking page
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/flight%20booking%20page%20(2).png" alt="login Page" />
</details>
<details>
  <summary>
    My booking list page
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/my%20booking%20page.png" alt="login Page" />
</details>
<details>
  <summary>
    Detail my booking Page
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/detail%20booking%20page.png" alt="login Page" />
</details>
<details>
  <summary>
    My profile
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/profile-user%20page.png" alt="login Page" />
</details>
<details>
  <summary>
    My profile settings
  </summary>
<img src="https://github.com/ainurcoding/angkasa-ticketing-app/blob/master/ss/setting%20profile%20user.png" alt="login Page" />
</details>
<hr />

### Demo Application
<p>Visit this link for app demo <a href='https://angkasa-ticketing.vercel.app/'>Ankasa Ticketing</a></p>
<hr />

### Contributor
<ul>
  <li><a href='https://github.com/ainurcoding'>Ainur Ridwan as a Fullstack Developer</a></li>
  <li><a href='https://github.com/brndnwjy'>Brandon Wijaya as a Fullstack Developer</a></li>
  <li><a href='https://github.com/vickomaris'>Vicko Maris Septiadi as a Frontend Developer</a></li>
  <li><a href='https://github.com/Iqbalapredo'>Muhammad Iqbal Aprido as a Frontend Developer</a></li>
  <li><a href='https://github.com/sukron21'>Rahmat Furqon as a Fullstack Developer</a></li>
</ul>
<hr />

## Authors

Contributors names and contact info:

1. Rahmat Furqon

- [Application](https://angkasa-ticketing.vercel.app/)

- [Telegram Chat App](https://github.com/sukron21/angkasa-ticketing-app-master)

- [Telegram Chat API](https://github.com/sukron21/angkasa-ticketing-api-master)

- [Linkedin](www.linkedin.com/in/furqon-rahmat)



