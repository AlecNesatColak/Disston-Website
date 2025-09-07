#!/usr/bin/env python3
"""
Script to create database tables for league models
"""

from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine, Base

# Import all models so SQLAlchemy can create tables
from app.models.league import League
from app.models.team import Team
from app.models.league_standings import LeagueStandings

def create_tables():
    """Create all database tables"""
    print("Creating database tables...")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    print("Tables created successfully!")
    print("Created tables:")
    for table_name in Base.metadata.tables.keys():
        print(f"  - {table_name}")

if __name__ == "__main__":
    create_tables()
