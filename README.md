# Safety Training Management System

A comprehensive web application for managing workplace safety training courses, student enrollments, and training certifications. Built with Node.js, Express, MySQL, and Docker.

## 📋 Overview

This system provides a complete solution for managing safety training programs in educational institutions. It handles student registration, class management, training modules, training plans, and instructor assignments with role-based access control.

## 🏗️ Architecture

The application follows a microservices architecture with the following components:

- **Backend API Server** (`wsserver`): Node.js/Express REST API with JWT authentication
- **Database Server** (`gfs-sql-server`): MySQL 8.0+ database
- **Reverse Proxy** (`gfs-reverse-proxy`): Nginx with SSL/TLS termination
- **Web Application** (`webapp`): Static frontend application
- **SSL/TLS Certificates**: Let's Encrypt integration via Certbot

### Network Architecture

```
┌─────────────────┐
│  Nginx Proxy    │ :443 (HTTPS)
│  (SSL/TLS)      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼────┐
│ Web  │  │  API  │ :3000
│ App  │  │Server │
└──────┘  └───┬───┘
              │
         ┌────▼────┐
         │  MySQL  │ :3306
         │Database │
         └─────────┘
```

## 🚀 Features

### Entity Management
- **Students**: Personal information, tax codes, birth dates
- **Classes**: Class names, academic years, sections, specializations
- **Academic Years**: School year tracking
- **Training Modules**: Safety training course modules
- **Training Plans**: Structured training programs
- **Instructors**: Training course instructors
- **Authorizations**: User role and permission management

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Token refresh mechanism
- Role-based access control
- Secure secret management via Docker secrets

### API Endpoints

All endpoints are prefixed with `/ws`:

- `/ws/studenti` - Students management
- `/ws/classi` - Classes management
- `/ws/classistudenti` - Student-class enrollments
- `/ws/anniscolastici` - Academic years
- `/ws/moduli` - Training modules
- `/ws/pianiformativi` - Training plans
- `/ws/pianiformativimoduli` - Training plan modules
- `/ws/pianiformativistudenti` - Student training plans
- `/ws/formatori` - Instructors
- `/ws/formazionistudenti` - Student training records
- `/ws/utenti` - User management
- `/ws/abilitazioni` - User authorizations
- `/ws/logs` - System logs
- `/ws/auth` - Authentication
- `/ws/refresh` - Token refresh

## 📦 Prerequisites

- Docker Engine 20.10+
- Docker Compose 3.3+
- 2GB RAM minimum
- SSL certificates (or ability to generate with Let's Encrypt)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd WebAppCertSicurezza/GestioneCertSicurezza
```

### 2. Configure Secrets

Create the following secret files in the project root:

```bash
# Database root password
echo "your_secure_password" > root_db_password.txt

# Admin web service password
echo "your_admin_password" > admin_ws_password.txt

# Initialization secret
echo "your_init_secret" > init_secret.txt

# Delete operation secret
echo "your_delete_secret" > delete_secret.txt
```

### 3. SSL/TLS Certificates

Place your SSL certificates in the `cert/archive/` directory, or configure Certbot for automatic certificate generation.

For Let's Encrypt:
```bash
# Edit docker-compose.yaml and uncomment the gfs-certbot service
# Update email and domain in the certbot command
```

### 4. Database Configuration

The database initialization script is located at:
- `sqlserver/GestioneCorsiSicurezza.sql`

This script will be automatically executed on first initialization via the `/ws/init` endpoint.

### 5. Start the Services

```bash
docker-compose up -d
```

This will start:
- MySQL database on port 3350 (external) / 3306 (internal)
- Node.js API server (internal port 3000)
- Nginx reverse proxy on port 443 (HTTPS)

### 6. Initialize the Database

Send a POST request to initialize the database:

```bash
curl -X POST https://your-domain/ws/init \
  -H "Content-Type: application/json" \
  -d '{"secret": "your_init_secret"}'
```

## 🔑 Environment Variables

Configuration is managed through:
- Docker secrets (for sensitive data)
- `wsserver/config.js` (for application settings)

Key configuration parameters:
- `baseUrl`: API base path (`/ws`)
- `serverPort`: API server port (`3000`)
- `dbParams`: Database connection parameters
- `saltRounds`: Bcrypt salt rounds for password hashing

## 📚 API Documentation

### Authentication

**Login**
```http
POST /ws/auth
Content-Type: application/json

{
  "username": "user",
  "password": "password"
}
```

**Refresh Token**
```http
POST /ws/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

### Example: Managing Students

**Get all students**
```http
GET /ws/studenti
Authorization: Bearer <your_token>
```

**Create a student**
```http
POST /ws/studenti
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "codicefiscale": "RSSMRA90A01H501U",
  "nome": "Mario",
  "cognome": "Rossi",
  "datanascita": "1990-01-01",
  "sesso": "M"
}
```

For detailed API documentation, visit `/ws/help.html` after deployment.

## 🧪 Testing

HTTP request files are provided in the `http-request/` directory:

- `test-studenti.http` - Student endpoints
- `test-classi.http` - Class endpoints
- `test-formatori.http` - Instructor endpoints
- `test-moduli.http` - Module endpoints
- `test-pianiformativi.http` - Training plan endpoints
- And more...

Use VS Code with the REST Client extension or similar tools to execute these tests.

## 🛠️ Development

### Backend Development

```bash
cd wsserver
npm install
npm install -g nodemon
nodemon app.js
```

### Database Schema

The database includes the following main tables:
- `studenti` - Student records
- `classi` - Class information
- `classistudenti` - Student-class relationships
- `anniscolastici` - Academic years
- `moduli` - Training modules
- `pianiformativi` - Training plans
- `pianiformativimoduli` - Training plan-module relationships
- `pianiformativistudenti` - Student training assignments
- `formatori` - Instructor information
- `formazionistudenti` - Student training completions
- `utenti` - User accounts
- `abilitazioni` - User permissions
- `logs` - System audit logs

## 📁 Project Structure

```
GestioneCertSicurezza/
├── docker-compose.yaml          # Docker orchestration
├── cert/                        # SSL/TLS certificates
│   ├── accounts/               # Let's Encrypt accounts
│   ├── archive/                # Certificate archives
│   ├── live/                   # Active certificates
│   └── renewal/                # Renewal configs
├── certbot/                    # Certbot configuration
├── http-request/               # API test files
├── proxyserver/                # Nginx reverse proxy
│   ├── Dockerfile
│   └── nginx.conf
├── sqlserver/                  # Database scripts
│   └── GestioneCorsiSicurezza.sql
├── webapp/                     # Frontend application
│   └── index.html
└── wsserver/                   # Backend API
    ├── app.js                  # Main application
    ├── config.js               # Configuration
    ├── auth.js                 # Authentication
    ├── package.json
    ├── *.js                    # Entity routers
    └── public/                 # Static assets
```

## 🐳 Docker Services

### Backend Server (`gfs-ws-server`)
- Image: `node:latest`
- Networks: `ws-sql-net`, `ws-rp-net`
- Dependencies: MySQL database
- Auto-restart: enabled
- Hot reload: enabled via nodemon

### Database Server (`gfs-sql-server`)
- Image: `mysql:latest`
- Port: 3350:3306
- Persistent volume: `db-storage`
- Auto-restart: enabled

### Reverse Proxy (`gfs-reverse-proxy`)
- Image: `nginx:latest`
- Port: 443 (HTTPS only)
- SSL termination
- Caching enabled

## 🔐 Security Considerations

1. **Change all default passwords** before deploying to production
2. **Use strong secrets** for JWT tokens and database passwords
3. **Keep certificates updated** - configure auto-renewal with Certbot
4. **Restrict database access** - remove port exposure in production
5. **Regular backups** of the database volume
6. **Monitor logs** regularly for suspicious activity
7. **Use HTTPS only** in production

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check database container logs
docker logs gfs-sql-server

# Verify network connectivity
docker exec gfs-ws-server ping gfs-sql-server
```

### SSL Certificate Issues
```bash
# Check certificate expiration
openssl x509 -in cert/archive/your-domain/fullchain.pem -noout -dates

# Test SSL configuration
curl -vI https://your-domain/ws
```

### API Server Issues
```bash
# Check API server logs
docker logs gfs-ws-server

# Restart the service
docker-compose restart gfs-ws-server
```

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

Created by **5Bi Marconi**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
1. Check the API documentation at `/ws/help.html`
2. Review the HTTP test files in `http-request/`
3. Check Docker logs for error messages
4. Consult the database schema in `sqlserver/GestioneCorsiSicurezza.sql`

## 🔄 Updates

To update the application:

```bash
# Pull latest changes
git pull origin main

# Rebuild containers
docker-compose down
docker-compose up -d --build

# Check service status
docker-compose ps
```

---

**Note**: This system is designed for managing workplace safety training in accordance with Italian safety regulations. Customize as needed for your specific requirements.
