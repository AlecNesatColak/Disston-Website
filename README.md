# Disston City Soccer Club

A modern web application for the Disston City Soccer Club, featuring a FastAPI backend and Next.js frontend.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd disston-website-app
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Development Commands

```bash
# Start services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build

# Clean up volumes
docker-compose down -v
```

## 🏗️ Architecture

### Backend (FastAPI)
- **Port**: 8000
- **Database**: SQLite (can be changed to PostgreSQL)
- **Features**: JWT Authentication, Player Management, Team Stats

### Frontend (Next.js)
- **Port**: 3000
- **Features**: Responsive Design, Modern UI, Real-time Updates

## 🔧 Development Setup

### Backend Development
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
disston-website-app/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── Dockerfile.backend
├── Dockerfile.frontend
├── docker-compose.yml
└── README.md
```

## 🔐 Environment Variables

### Backend
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: JWT secret key
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API URL

## 🐳 Docker Configuration

### Backend Dockerfile
- Python 3.11 slim image
- Non-root user for security
- Optimized layer caching

### Frontend Dockerfile
- Node.js 18 Alpine image
- Production build optimization
- Non-root user for security

### Docker Compose
- Multi-service orchestration
- Volume persistence for database
- Network isolation
- Health checks and restart policies

## 🚀 Production Deployment

### Using Docker Compose
```bash
# Production build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# With custom environment
docker-compose --env-file .env.production up -d
```

### Environment Variables for Production
Create a `.env.production` file:
```env
DATABASE_URL=postgresql://user:password@host:port/db
SECRET_KEY=your-production-secret-key
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 📊 Features

- **Player Management**: Add, edit, and manage player profiles
- **Team Statistics**: Track goals, assists, clean sheets
- **Match Scheduling**: View upcoming matches
- **Authentication**: JWT-based user authentication
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live statistics and news

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License. 