# NestJS

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Database

I used MySQL v8.0
If you haven`t installed database in your machine, you can use docker container.

```bash
docker run --name mysql \
           --volume "$(pwd)/data:/var/lib/mysql" \
           --env MYSQL_ROOT_PASSWORD=secret \
           --publish 3306:3306 \
           --detach \
           --restart unless-stopped \
           --net freelancer \
           mysql:8.0
```

## Creating a New User

### Enter into container

1.  `docker exec -it mysqldb bash`

### Enter into MySQL

2. `root@16d0d1803a49:/# mysql -u root -psecret`

### Create new User with Password

3. `CREATE USER 'admin' IDENTIFIED BY 'root';`

### Check new User

4. `SELECT user FROM mysql.user;`

### Granting a User Permissions

5. `GRANT ALL PRIVILEGES ON * . * TO 'admin';`
   `FLUSH PRIVILEGES;`
   You can review a user’s current permissions by running the SHOW GRANTS command:
   `SHOW GRANTS FOR 'admin';`
6. After creating your MySQL user and granting them privileges, you can exit the MySQL client:

```bash
mysql> exit
```

7. to log in as your new MySQL user, you’d use a command like the following:

```bash
root@16d0d1803a49:/# mysql -u admin -p
```

### Create new database

8. `CREATE DATABASE IF NOT EXISTS freelancer_db;`
   `show databases;`

### Update .env file

`DATABASE_USERNAME=admin`
`DATABASE_PASSWORD=root`
`DATABASE_NAME=freelancer_db`

# Migration

After setup database and NestJS connected to database, you would run migration.
`npm run migration:run`
`npm run start:dev`

# Documentaion

URL: `http://localhost:3000/docs/`

# REST API

## Get All users

Method: ` GET`
Endpoint :`/auth/allUsers`

## Create user

Method: ` POST`
Endpoint :`/auth/createUser`
Body:

```json
{
  "user": {
    "username": "",
    "email": "",
    "password": ""
  }
}
```

# PhpMyAdmin

```bash
docker run --name phpmyadmin \
           --net freelancer \
           --env PMA_HOST=mysql \
           --detach \
           --publish 8081:80 \
           phpmyadmin/phpmyadmin
```

### Create a Docker network

`docker network create freelancer`

# Connect MySQL and phpMyAdmin containers to our network

`docker network connect freelancer mysql`
`docker network connect freelancer phpmyadmin`

### Seeder

1. Drop current database using `npm run migration:drop`
2. Run new migration `npm run migration:run`
3. Run command `npm run seed:run` to seed

### TODO

1. Надо настроить seeder на работу с тайпскриптом во время режима разработки, чтобы "понимал" ни только js, но и ts файлы.
2. Научиться добавлять/изменять/удалять данные в сущностях, которые имеют связи с использованием qb
