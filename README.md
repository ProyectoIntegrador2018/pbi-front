# Nombre del proyecto

Sistema de Inscripciones PBI (Sitio Web)

## Table of contents

* [Client Details](#client-details)
* [Environment URLS](#environment-urls)
* [Team members](#team-members)
* [Technology Stack](#technology-stack)
* [Management resources](#management-resources)
* [Setup the project](#setup-the-project)
* [Running the stack for development](#running-the-stack-for-development)
* [Stop the project](#stop-the-project)
* [Restoring the database](#restoring-the-database)
* [Debugging](#debugging)
* [Running specs](#running-specs)
* [Checking code for potential issues](#checking-code-for-potential-issues)


### Client Details

| Name                         | Email             | Role                                                                               |
| ---------------------------- | ----------------- | ---------------------------------------------------------------------------------- |
| Patricia Magdalena González  | patygzz@tec.mx    | Directora en Dirección de Bienestar y Consejería ITESM Campus Mty.                 |
| Sandra Nohemí Ramos Hernández| snrh@tec.mx       | Especialista de bienestar en Dirección de Bienestar y Consejería ITESM Campus Mty. | 


### Environment URLS

* **Production** - [TBD](inscripcionespbitec.firebaseapp.com)
* **Development** - [TBD](TBD)

### Team members

Version 1.0
| Name                              | Email                   | Role                              |
| --------------------------------- | ----------------------- | --------------------------------- |
|Lizzie Marielle Guajardo Mozo      | lizziemgm97@gmail.com   | Desarrollador                     |
|Alejandro González Valles          | alex.glz.v@hotmail.com  | Desarrollador                     |
|David Rojas Ortíz                  | dav_rojas@hotmail.com   | Desarrollador                     |
|Jonathan Melesio Cárdenas García   | jonathancrd@outlook.com | Desarrollador                     |
|Lizzie Montserrat Cañamar Carrillo | lizziecanamar@gmail.com | Desarrollador                     |

Version 2.0
| Name                              | Email                   | Role                              |
| --------------------------------- | ----------------------- | --------------------------------- |
|Lizzie Marielle Guajardo Mozo      | lizziemgm97@gmail.com   | Producto Owner Proxy              |
|Alejandro González Valles          | alex.glz.v@hotmail.com  | Administrador de Configuración    |
|David Rojas Ortíz                  | dav_rojas@hotmail.com   | SCRUM Master                      |
|Lizzie Montserrat Cañamar Carrillo | lizziecanamar@gmail.com | Administrador de Proyecto         |

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

### Management tools

You should ask for access to this to        ols if you don't have it already:

* [Github repo](https://github.com/ProyectoIntegrador2018/pbi-front)
* [Backlog]()
* [Heroku](https://inscripcionespbi-backend.herokuapp.com) (API)
* [Documentation](https://drive.google.com/drive/u/2/folders/1HxzSv_UqLsO1F6e_aaYM3d7Hoos28w91)

## Development

### Setup the project

In order to correctly set up [`pbi-front`](https://github.com/ProyectoIntegrador2018/pbi-front) you will need to follow
some steps, after running this proyect we recommend installing the `vue-cli` usign:

```bash
$ npm install -g @vue/cli
```

After installing please you can follow this simple steps:

1. Clone this repository into your local machine

```bash
$ git clone git@github.com:ProyectoIntegrador2018/pbi-front.git
```
2. To completely setup this proyect is needed to setup the back-end ([pbi-api](https://github.com/ProyectoIntegrador2018/pbi-api)).

### Running the stack for Development

1. Fire up a terminal and run: 

```
npm run serve
```

That command will creat a local instance of the site at `localhost:8080` 


It may take a while before you see anything. 

Once you see an output like this:

```
 DONE  Compiled successfully in 29925ms                                                                         20:45:57


  App running at:
  - Local:   http://localhost:8080/
  - Network: http://10.22.172.22:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

This means the project is up and running.


2. To completely setup this proyect is needed to setup the back-end ([pbi-api](https://github.com/ProyectoIntegrador2018/pbi-api)).

### Building the proyect for production

1. Fire up a tarminal, go to the proyect directory and run:

```bash
$ npm run build
```

This command will generate a folder named `dist` inside the proyect folder. This folder contains a bundle of a Single-Page application.

Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html

<!-- ### Firebase deployment -->

<!-- This proyect Front-end is hosted using Google Firebase Hosting -->