# PBI Front-End: Deployment

In this document we specify how to create a single-view app of the project. 

## Table of contents

* [Preconditions](#Preconditions)
* [Technology Stack](#technology-stack)
* [Clone or update repository](#Clone-or-update-repository)
* [Deploying to Heroku](#Deploying-to-Heroku)
* [Building the project](#Building-the-project)
* [Deploying the project](#Deploying-the-project)

### Technology Stack
| Technology      | Version      |
| --------------- | ------------ |
| Vue             | 2.6.11       |
| Vue/CLI         | 4.2.3        |
| Vuetify         | 2.0.5        |
| Axios           | 0.19.2       |
| Exceljs         | 3.4.0        |
| sweetalert2     | 9.3.13       |
| moment-timezone | 0.5.27       |


### Preconditions

- Vue CLI ([Instructions](https://cli.vuejs.org/guide/installation.html))

##### Optional (In this example we use Firebase Hosting)
- Firebase CLI ([Intructions](https://firebase.google.com/docs/cli#install_the_firebase_cli))

### Clone or update repository
If you don't have a copy of the repository, you will have to clone it first:
```bash
$ git clone git@github.com:ProyectoIntegrador2018/pbi-front.git
```

Run the following command:
```bash
$ git status
```

If done correctly you will get the next message:
```
On branch master
Your branch is up-to-date with 'origin/master'.
```

If not, make sure your working directory is clean and that the local branch is up to date:
```bash
$ git pull origin master
```

### Building the project

Make sure to install the Vue-Cli before following this steps.

1. Go to the root folder and open a terminal.
2. Run the next command:
```bash
$ npm run build
```
3. This process may take a while.
4. The project will be configured as a single-view app and it will be saved in a folder called 'dist'.
5. The project is ready for its deployment

### Deploying the project
#### Firebase example:
1. Open a terminal in the root project.

2. Initialize a session in firebase using:
```bash
firebase login
```
3. Initialize a project:
```bash
firabase init
```
4. For this front-ent the only service that need to be selected is Hosting:
```bash
() Hosting: Configure and deploy Firebase Hosting sites
```
5. Follow the instructions of the client. Select the project as a single-view app. And select 'dist' as the public folder.

6. You can test your site usign:
```bash
firabase serve
```

7. To deploy the project to firebase use the next command:
```bash
firabase deploy
```
Now the site is running on the internet.

Make sure to correctly conect the back-end.