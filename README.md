# Vaccination-The-Third-World

## Description
![LOGO](/assets/images/thunder.png)
logo made by me (Idan Baumer)©.
This app aim to handle database about citizens and their COVID-19 / other health conditions status
In the project's frontside: Node.js, React, MUI, react-router, react-csv.
Backside: django, djangorestframework, django-cors-headers, psycopg2

front and end are connected using restframework and fetch methods.

## Table of Contents


- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

###open frontend folder using terminal:
the following command `after install`, dependency is nodejs LTS version 16.15.1 or above
install `npm install` command, `npm build` afterwords for production

###open backend folder:
open the following file `Backend/settings.py` change SECRET_KEY with your own key or a key from this site for example: https://djecrety.ir/
change POSTGRSSE NAME and PASSWORD for your own postgrase sever configs,
after changing run `python manage.py makemigrations VaccinationApp`, and finally `python manage.py migrate VaccinationApp`


## Usage

`npm start` will start the frontend side.
`python manage.py runserver` will start the backend side.
![image1](/assets/images/first_pic.png)
![image2](/assets/images/second_pic.png)

## Credits
1. [react](https://github.com/facebook/react)
2. [mui](https://github.com/mui/material-ui)
3. [node.js](https://github.com/nodejs/node)
4. [react router](https://reactrouter.com/)
5. [react csv](https://github.com/react-csv/react-csv)
6. [django](https://github.com/django/django)
7. [django-cors-headers](https://github.com/adamchainz/django-cors-headers)
8. [djangorestframework](https://github.com/encode/django-rest-framework)
9. [psycopg2](https://github.com/psycopg/psycopg2)
10. [Python Django + PostgreSQL | REST API Tutorial](https://www.youtube.com/watch?v=Pwwz4_AvHDU)


## License
This project is licensed under the terms of the GPL-3.0 license.


## Features
1. List of countries with both sides validation, possibility of choosing any country in the world's  list.
2. Choose the most famous cities from each country in a list, or an option (other) if nothing has been found.
3. Filter or sort any column in the data page.
4. Refresh option to fetch new data from the list.
5. export data to .csv file
![image1](/assets/images/first_pic.png)
![image2](/assets/images/second_pic.png)
