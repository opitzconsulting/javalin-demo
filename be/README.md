Our project: com.opitzconsulting.demo.javalin.Technology management system

com.opitzconsulting.demo.javalin.Technology management system is a single page application in which technologies can be saved and evaluated.
A microservices architecture with few microservices should be realized, in which the individual frameworks are compared. The technology microservice to be developed as an example is a simple service that provides a REST backend that accesses a relational database (PostgreSQL).

The Javalin - microservice offers the following functionalities:

• Shows a list of the currently entered technologies

• New technologies can be created.

• Technologies that are no longer required can be deleted.

• Technologies can be updated.

• The backend recognizes the similarities and prevents double entries.

TO DO:
In this example, the backend is connected to the PostgreSQL database. 
Please download the PostgreSQL database. If you don't want to change the code, 
select the user name as "postgres" and password as "kineKine41!" .
Afterwards create the "technologies" table.
In order to successfully connect to the database create the environment variables 
DB_URL which is 127.0.0.1 and DB_PORT which is 5432.
