## [IMDB - Searching, Rating and Reviewing movies !](https://localhost:8081)

Hello everyone 👋
This is my first self-learned FullStack project!
the main purpose of this project is practice code that includes both the client and the server side, and also working with web servers and databases.

The client side is written with javascript, css and ReactJS (including materialUI and styled-components) while using GraphQL and react-apollo.
The sever is written with GO (including ent and gqlgen) and the database we use is is MySQL.

_I am not associated with nor speak for IMDB site._

_The main welcome page's photo Belong to NETFLIX inc._ 

_Notice That Im currently working on the app, so NEW FEATURES are been added on daily basics!_


<p align="center">
    <img alt="React" src="https://img.shields.io/badge/-React-61DBFB?style=flat&logo=react&logoColor=FFFFFF"/>
    <img alt="Go" style="height: 0.55cm;" src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white"/>
    <img alt="apollo" style="height: 0.55cm;" src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql"/>
    <img alt="Styled Components" src="https://img.shields.io/badge/-<💅>%20Styled%20Components-grey?style=flat"/>
    <img alt="Open Source? Yes!" src="https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github"/>
</p>

<p align="center">
    <img alt="Issues" src="https://img.shields.io/github/issues-raw/dorlib/IMDB-Project"/>
    <img alt="pull request" src="https://img.shields.io/github/issues-pr-closed/dorlib/IMDB-Project"/>
    <img alt="stars" src="https://img.shields.io/github/stars/dorlib/IMDB-Project?style=social">
    <img alt="updated" src="https://img.shields.io/github/last-commit/dorlib/IMDB-project">
    <img alt="size" src="https://img.shields.io/github/repo-size/dorlib/IMDB-Project" >
</p>

![IMDB WELCOME](https://user-images.githubusercontent.com/90474428/174454702-4f343853-7da1-41e7-a68f-201261dfc613.png)

## Built With

- [React JS](https://reactjs.org/docs/getting-started.html)
- [Styled-Components](https://styled-components.com/docs)
- [Material UI Icons](https://material-ui.com/components/material-icons/)
- [ent](https://entgo.io/)
- [graphql](https://graphql.org/)
- [gqlgen](https://gqlgen.com/getting-started/) 
- [Go](https://go.dev/)

---


## What the Application include?

The main entites in the app are : movies, directors, actors, reviews and users.
As you can see in the welcome page of the app, the main "things" you can do are : contibuete, review, rate and search
Let's cover them up!

1. Contribute - this app depends on active users. only the logged in users can add new movies, directors, actors and reviews!
2. review - the app have review system, which is corrently on progress (We plan on make a review system which show the nickname and avatar of every user)
3. rate - the app let you rate your favorite movies
4. search - we have search engine by: users, movies, directors and genres (only users can search for other users)

And also, This app works with new cool technologies like Ent, which communicate with MySQL DB.
Also grapqhl and gqlgen, which makes the client Request to the server.
The app has fully working authentication and authorization processes!

---

## Running the Application Yourself

Here's what you need to do to get this running locally on your computer.

### Run Docker container with:

### Or follow those steps:

1. Clone the project to your machine with `git clone https://github.com/dorlib/IMDB-Project.git`
2. Install Go on your machine from [here](https://go.dev/doc/install).
3. Install MySQL on your machine from [here](https://www.mysql.com/downloads/).
4. On a command line inside of the application's folder, run `npm start`
5. On another terminal run the server with `go run ./server -emailAdd <your mail> -Pass <your pass>`
6. Provided email address and password will not be saved, and they are provided only to make reset password possible.
7. Make sure that you allow less secure apps From your Google Account and also done 2 step-verification, check [this](https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required) post for more Info.
8. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Seed data to your database

In my opinion, the best way to test this app is by createing a user, add your favoritre movies, actors and directors and nake some review and rating!

but, if your looking for pre-made data to insert, Here's what you need to do to get it:

1. Create a user in the registration form.
2. Sign in with your user.
3. Click on you avatar on the top - right corner and then click on "insert data" option.

![insert](https://user-images.githubusercontent.com/90474428/174502797-c17bec2d-2ed1-416e-828a-87e1e1c691b9.png)

4. And thats it!



---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

### _notise the "mission.txt" file in "public" directory to see futre features which planned to be added!_

### How To Contribute

1. Fork the repository to your own Github account.
2. Clone the project to your machine.
3. Create a branch locally with a succinct but descriptive name.
4. Commit changes to the branch.
5. Following any formatting and testing guidelines specific to this repo.
6. Push changes to your fork.
7. Open a Pull Request in my repository.

---

## Creator / Maintainer

Dor Liberman ([dorlib](https://github.com/anniedotexe))

If you have any questions or feedback, i would be glad if you will contact me via mail.

<p align="left">
  <a href="dorlibrm@gmail.com"> 
    <img alt="Connect via Email" src="https://img.shields.io/badge/Gmail-c14438?style=flat&logo=Gmail&logoColor=white" />
  </a>
</p>

This project was created for educational purposes and for personal and open-source use.

If you like my content or find my code useful, give it a :star: 


---
