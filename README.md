# Password Manager 💙

A Password Manager project created using the MERN stack.
You can login and save your passwords. Passwords are saved in the database after AES encryption ⛓️ . So, your passwords are safe here. 🦺


## Setting up the project

Go to the folder in which you want to clone the project and run the following command
```bash
git clone https://github.com/rockingrohit9639/password-manager-mern.git
```

### Setting up the server
To setup the server in your system run the following commands
```
cd server
npm install
```

After installing all the server dependencies run the server using the following command 
```sh
nodemon app.js
```
Now, the server will be up and running

**Note :- You have to configure all the environment variables by creating a config.env file in root server folder.

### Setting up the client
Go to the client folder and run 
```
npm install
```
All the dependencies should be installed. Now, you just have to start the React server by following command

```
npm start
```
### You also have to keep the mongodb cluster open in order to run the app properly.

# How to contribute?
This project is completely open source. Everyone's contribution is welcome here.
The following are guidelines for contributing to this project.

### 🚩 New Issue : 
For any bug or a new feature please open an issue [here](https://github.com/rockingrohit9639/password-manager-mern/issues/new)

### 🚩 Forking repository :
Firstly you have to make your own copy of the project. For that, you have to fork the repository. You can find the fork button on the top-right side of the browser window. (Refer to the image below )
Kindly wait till it gets forked.
After that copy will look like <your-user-name>/password-manager-mern forked from rockingrohit/password-manager-mern.

### 🚩 Clone repository :
Now you have your own copy of the project. Here you have to start your work.
Go to the desired location on your computer where you want to set up the project.
Right-click there and click on git bash. A terminal window will pop up
Type the command git clone <your-fork-url>.git and hit enter.
Wait for few seconds till the project gets copied
  
### Setup the prjects given at the top of this readme file.

### 🚩 Pushing your changes :
After doing the changes, and when tests are successfully passing you can push your changes to remote.
Go to your terminal and type git status and hit enter, this will show your changes from the files.
Then type in git add . and hit enter, this will add all the files to the staging area.
Commit the changes by git commit -m "<message-describing-your-change>" and hit enter.
Now push your branch to your fork by git push origin <your-branch-name> or git push and hit enter.

### 📌 Creating a pull request : 
By this time you can see a message on your GitHub fork as your fork is ahead of rockingrohit9639: master by <number> of commits and you can also see a button Compare and pull request.
Click on Compare and pull request button
Fill the form completely by describing your change, cause of change, issue getting fixed etc.
After filling the form completely click on Create Pull request
  
Then your work is done. Thank you for your submissions. I will review your code and merge it.
