# HBnB Evolution: Phase 2 (Database Persistence)

Enhancing Database Integration and Security for HBnB Evolution Project

In the second phase of the HBnB Evolution project, the objective is to elevate your application by incorporating a relational database using SQLAlchemy, an Object-Relational Mapper (ORM), and fortifying security through JWT authentication. This stage is designed to offer students practical experience in upgrading an existing application to support scalable and secure operations.

## Learning Objectives

- **Mastering ORM Implementation**: Students will learn to integrate SQLAlchemy into a Flask application to handle database operations efficiently.
- **Database Administration**: Acquire skills in configuring and managing a relational database, including schema design and migrations.
- **Security Enhancement**: Learn to secure API endpoints using JWT authentication, ensuring regulated and secure data access.
- **Scalability and Adaptability**: Improve the application’s adaptability by enabling dynamic switching between different persistence methods, preparing for scalable deployment.

## Tasks to be Accomplished

### 1. SQLAlchemy Integration

- Update the application to incorporate SQLAlchemy, establishing models that interact with a database while maintaining the option for file-based persistence.
- Ensure all models are correctly adapted to be SQLAlchemy ORM-compatible classes.
- Configure SQLAlchemy to connect to a SQLite database for development purposes.

### 2. Configurable Database Selection

- Implement a configuration system that allows toggling between using SQLite for development and a more robust database like PostgreSQL for production.
- Ensure the application can dynamically select the database type based on environment settings or configuration files.

### 3. JWT Authentication Implementation

- Integrate Flask-JWT-Extended to add secure authentication mechanisms to the API.
- Create endpoints for user authentication that issue JWTs and use these tokens to control access to various API endpoints.

### 4. Database Schema Design and Migration

- Design a database schema that accurately represents data relationships and business rules.
- Create SQL scripts for your database structure, and optionally use tools like Alembic for managing database migrations.

### 5. Role-Based Access Control

- Modify existing API endpoints to incorporate checks for user roles and permissions, restricting certain actions to authenticated users or administrators.

### 6. Docker Integration

- Update Docker configuration to support the new database and authentication functionalities.
- Ensure the Docker environment is configured to handle different database types and authentication services.

## Resources

- **SQLAlchemy Documentation**: Utilize the SQLAlchemy documentation to understand ORM configuration and usage.
- **Flask-JWT-Extended Tutorial**: Refer to resources on Flask-JWT-Extended to learn how to implement JWT in Flask applications.
- **Alembic for Migrations**: Check out Alembic documentation for guidance on database migrations.
- **Environment Configuration**: Use environment variables to manage database connections and other settings, ensuring flexibility across different deployment environments.
- **Security Best Practices**: Learn about security best practices, particularly in storing passwords securely and managing user authentication.

As part of enhancing this phase of the HBnB Evolution project, it is crucial to integrate real-world database testing into your application development. Consequently, you will use a Docker container with MySQL or PostgreSQL as an external server to test your implementation.

## Instructions for Using Docker with MySQL/PostgreSQL

1. **Choose a Database**: Decide whether to use MySQL or PostgreSQL for your production database.
2. **Pull the Docker Image**:
   - For MySQL: `docker pull mysql`
   - For PostgreSQL: `docker pull postgres`
3. **Run the Database in a Docker Container**:
   - For MySQL: `docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest`
   - For PostgreSQL: `docker run --name postgres-db -e POSTGRES_PASSWORD=my-secret-pw -d postgres`
   Replace `my-secret-pw` with a secure password.
4. **Configure Your Application**:
   - Update your application’s configuration to connect to the database running in the Docker container.
   - Use the appropriate connection string for MySQL or PostgreSQL.
5. **Test Your Application**:
   - Ensure your application correctly connects to and interacts with the database within the Docker container.
   - Conduct all relevant tests to verify database operations.

## Resources for Setup and Testing

- **Docker Official Documentation**: Get Started with Docker
- **MySQL Docker Image Documentation**: MySQL Docker Official Image
- **PostgreSQL Docker Image Documentation**: PostgreSQL Docker Official Image
- **Connecting to MySQL/PostgreSQL from Python**: Refer to SQLAlchemy documentation for MySQL and PostgreSQL connections.

## Authors

- Nihad Namatli[@nihad1213](https://github.com/nihad1213)
- Aslan Aslanov [@as1an87](https://github.com/as1an87)
- Narmin Mammadova[@mammadova04](https://github.com/mammadova04)

