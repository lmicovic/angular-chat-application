# Real-Time Private Chat Application

This is a real-time private one-to-one chat application built using [HTML](https://www.w3schools.com/html/ "HTML"), [CSS](https://www.w3schools.com/css/ "CSS"), [TypeScript](https://www.typescriptlang.org/ "TypeScript") and  [Angular17](https://angular.dev/ "Angular") framework. The application allows users to communicate securely and efficiently, providing a seamless chat experience.

![Image](https://github.com/user-attachments/assets/a25d0146-68a3-49d8-a3cb-613e16c72836)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [How to Run](#how-to-run)

## Overview

The Real-Time Private Chat Application is designed to facilitate secure and private conversations between users. With a focus on user experience and performance, this application leverages modern web technologies to deliver a robust messaging platform.

### Backend Application
Backend Application for this application is at following repository: https://github.com/lmicovic/spring-chat-application

## Features

- **Private User-to-User Chat**: Engage in direct conversations with other users.
- **Message Persistence**: Users can access their message history even after logging out.
- **User Authentication**: Secure login using [JWT tokens](https://en.wikipedia.org/wiki/JSON_Web_Token "JWT tokens") and [OAuth2](https://developers.google.com/identity/protocols/oauth2 "OAuth2") for Google authentication.
- **Online User Status**: See which users are currently online to enhance interaction.
- **User Management**: Block users and add them to a friend list.
- **Typing Indicator**: Real-time typing indicator to enhance user interaction.
- **Media Sharing**: Send images and files as messages.

## Technologies

- **Frontend**: [HTML](https://www.w3schools.com/html/ "HTML"), [CSS](https://www.w3schools.com/css/ "CSS"), [TypeScript](https://www.typescriptlang.org/ "TypeScript") and  [Angular17](https://angular.dev/ "Angular")
- **IDE**: [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code")
- **Authentication**: [JWT Token](https://en.wikipedia.org/wiki/JSON_Web_Token "JWT Token"), [OAuth2](https://developers.google.com/identity/protocols/oauth2 "OAuth2") (Google)
- **Real-time Communication:** [WebSocket](https://en.wikipedia.org/wiki/WebSocket#:~:text=WebSocket%20is%20a%20computer%20communications,as%20RFC%206455%20in%202011. "WebSocket")

## How to run
1. Clone project from Github repository by typing following command in terminal:
`git clone https://github.com/lmicovic/angular-chat-application`

2. Install Node.js:
	- Install Node.js from: https://nodejs.org/en/download
	- Check node.js version by typing following command in terminal:<br>
	`node -v`
	- Check npm(Node Package Manager) version by typing following command in terminal:<br>
	`npm -v`
	
3. Install Angular17 version on your computer by typing following command in terminal:<br>
`npm install -g @angular/cli@17.0.0`
	- Check Angular version by typing following in terminal:<br>
`ng version`

4. Install all Angular dependencies:
	- Open Termnal and locate to project root directory:<br>
`cd D:\Downloads\projectName`
	- Install all Angular dependencies by typing following command in terminal:<br>
`npm install --legacy-peer-deps`

5. Run Angular Application:
	- Open Termnal and locate to project root directory:<br>
`cd D:\Downloads\projectName`
	- In terminal type following command to start Angular application:<br>
`ng serve`
	- Application will be up and running on URL: http://localhost:4200/
	
<br>

------------

## Contributions
Other contributions are welcome! Feel free to open issues, submit pull requests, or suggest improvements.
