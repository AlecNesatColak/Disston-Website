#!/usr/bin/env python3
"""
Seed script for creating Fall 2025/2026 Suncoast League data
"""

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.league import League, LeagueTypeEnum
from app.models.team import Team
from app.models.league_standings import LeagueStandings


def create_suncoast_league_data():
    """Create the Fall 2025/2026 Suncoast League with teams and initial standings"""
    
    db = SessionLocal()
    
    try:
        # Create the league
        league = League(
            name="Fall 2025/2026 - Men Second (11v11)",
            league_type=LeagueTypeEnum.SUNCOAST,
            season="2025/2026",
            division="Men Second (11v11)",
            is_active=1
        )
        db.add(league)
        db.commit()
        db.refresh(league)
        
        # Teams from the provided data
        teams_data = [
            "BTFC2",
            "Charlotte Premier", 
            "Disston City Soccer Club",
            "SFC HOOLIGANS",
            "SFC United 2",
            "SPFC Aztecs 2"
        ]
        
        teams = []
        standings = []
        
        # Create teams and initial standings
        for i, team_name in enumerate(teams_data, 1):
            # Create team
            team = Team(
                name=team_name,
                league_id=league.id,
                is_active=1
            )
            db.add(team)
            db.commit()
            db.refresh(team)
            teams.append(team)
            
            # Create initial standings (all zeros as provided)
            standing = LeagueStandings(
                league_id=league.id,
                team_id=team.id,
                matches_played=0,
                wins=0,
                draws=0,
                losses=0,
                goals_for=0,
                goals_against=0,
                goal_difference=0,
                points=0,
                position=i  # Initial position based on order provided
            )
            db.add(standing)
            standings.append(standing)
        
        db.commit()
        
        print(f"Successfully created league: {league.name}")
        print(f"Created {len(teams)} teams:")
        for team in teams:
            print(f"  - {team.name}")
        
        return league.id
        
    except Exception as e:
        db.rollback()
        print(f"Error creating league data: {e}")
        raise
    finally:
        db.close()


def create_mexican_league_data():
    """Create a sample Mexican League for testing"""
    
    db = SessionLocal()
    
    try:
        # Create the Mexican league
        league = League(
            name="Fall 2025/2026 - Mexican League",
            league_type=LeagueTypeEnum.MEXICAN,
            season="2025/2026",
            division="Men First Division",
            is_active=1
        )
        db.add(league)
        db.commit()
        db.refresh(league)
        
        # Sample Mexican teams
        teams_data = [
            "Disston City Soccer Club",
            "Club América",
            "Cruz Azul",
            "Guadalajara",
            "Pumas UNAM",
            "Tigres UANL"
        ]
        
        teams = []
        standings = []
        
        # Create teams and initial standings
        for i, team_name in enumerate(teams_data, 1):
            # Create team
            team = Team(
                name=team_name,
                league_id=league.id,
                is_active=1
            )
            db.add(team)
            db.commit()
            db.refresh(team)
            teams.append(team)
            
            # Create initial standings with some sample data
            standing = LeagueStandings(
                league_id=league.id,
                team_id=team.id,
                matches_played=10,
                wins=8 - i + 1,
                draws=1,
                losses=i - 1,
                goals_for=20 - i * 2,
                goals_against=5 + i,
                goal_difference=20 - i * 2 - (5 + i),
                points=(8 - i + 1) * 3 + 1,
                position=i
            )
            db.add(standing)
            standings.append(standing)
        
        db.commit()
        
        print(f"Successfully created Mexican league: {league.name}")
        print(f"Created {len(teams)} teams:")
        for team in teams:
            print(f"  - {team.name}")
        
        return league.id
        
    except Exception as e:
        db.rollback()
        print(f"Error creating Mexican league data: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("Creating league seed data...")
    
    # Create Suncoast League
    suncoast_league_id = create_suncoast_league_data()
    
    # Create Mexican League
    mexican_league_id = create_mexican_league_data()
    
    print(f"\nSeed data creation completed!")
    print(f"Suncoast League ID: {suncoast_league_id}")
    print(f"Mexican League ID: {mexican_league_id}")
