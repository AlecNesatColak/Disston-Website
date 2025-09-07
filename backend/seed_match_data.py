#!/usr/bin/env python3
"""
Seed script for creating Suncoast League match schedule data
"""

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.league import League, LeagueTypeEnum
from app.models.team import Team
from app.models.league_standings import LeagueStandings
from app.models.match_new import Match, MatchStatusEnum
from datetime import datetime
import uuid

def create_suncoast_matches():
    """Create the complete Suncoast League schedule"""
    
    db = SessionLocal()
    
    try:
        # Get the Suncoast league
        league = db.query(League).filter(League.league_type == LeagueTypeEnum.SUNCOAST).first()
        if not league:
            print("Suncoast league not found. Please run league seed data first.")
            return
        
        # Get all teams
        teams = db.query(Team).filter(Team.league_id == league.id).all()
        team_map = {team.name: team for team in teams}
        
        # Define the schedule data
        schedule_data = [
            # September 14, 2025
            {
                "date": datetime(2025, 9, 14),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "Disston City Soccer Club",
                        "away_team": "SFC HOOLIGANS",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "Charlotte Premier",
                        "away_team": "SFC United 2",
                        "venue": "charlotte county regional park",
                        "field": "charlotte regional park"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "BTFC2",
                        "away_team": "SPFC Aztecs 2",
                        "venue": "jc handley",
                        "field": "jc handley field 2"
                    }
                ]
            },
            # September 28, 2025
            {
                "date": datetime(2025, 9, 28),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "SFC HOOLIGANS",
                        "away_team": "SPFC Aztecs 2",
                        "venue": "seminole rec fields",
                        "field": "seminole rec field"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "Charlotte Premier",
                        "away_team": "Disston City Soccer Club",
                        "venue": "charlotte county regional park",
                        "field": "charlotte regional park"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "BTFC2",
                        "away_team": "SFC United 2",
                        "venue": "jc handley",
                        "field": "jc handley field 2"
                    }
                ]
            },
            # October 12, 2025
            {
                "date": datetime(2025, 10, 12),
                "matches": [
                    {
                        "time": "11:00 AM",
                        "home_team": "BTFC2",
                        "away_team": "SFC HOOLIGANS",
                        "venue": "jc handley",
                        "field": "jc handley field 2"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SPFC Aztecs 2",
                        "away_team": "Charlotte Premier",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC United 2",
                        "away_team": "Disston City Soccer Club",
                        "venue": "sarasota football club",
                        "field": "sarasota football club field 1"
                    }
                ]
            },
            # October 19, 2025
            {
                "date": datetime(2025, 10, 19),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "Disston City Soccer Club",
                        "away_team": "SPFC Aztecs 2",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    }
                ]
            },
            # October 26, 2025
            {
                "date": datetime(2025, 10, 26),
                "matches": [
                    {
                        "time": "11:00 AM",
                        "home_team": "BTFC2",
                        "away_team": "Disston City Soccer Club",
                        "venue": "jc handley",
                        "field": "jc handley field 2"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC United 2",
                        "away_team": "SPFC Aztecs 2",
                        "venue": "sarasota football club",
                        "field": "sarasota football club field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC HOOLIGANS",
                        "away_team": "Charlotte Premier",
                        "venue": "seminole rec fields",
                        "field": "seminole rec field"
                    }
                ]
            },
            # November 2, 2025
            {
                "date": datetime(2025, 11, 2),
                "matches": [
                    {
                        "time": "11:00 AM",
                        "home_team": "BTFC2",
                        "away_team": "Charlotte Premier",
                        "venue": "jc handley",
                        "field": "jc handley field 2"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC HOOLIGANS",
                        "away_team": "SFC United 2",
                        "venue": "seminole rec fields",
                        "field": "seminole rec field"
                    }
                ]
            },
            # November 16, 2025
            {
                "date": datetime(2025, 11, 16),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "SFC HOOLIGANS",
                        "away_team": "Disston City Soccer Club",
                        "venue": "seminole rec fields",
                        "field": "seminole rec field"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SPFC Aztecs 2",
                        "away_team": "BTFC2",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC United 2",
                        "away_team": "Charlotte Premier",
                        "venue": "sarasota football club",
                        "field": "sarasota football club field 1"
                    }
                ]
            },
            # December 7, 2025
            {
                "date": datetime(2025, 12, 7),
                "matches": [
                    {
                        "time": "11:00 AM",
                        "home_team": "Disston City Soccer Club",
                        "away_team": "Charlotte Premier",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC United 2",
                        "away_team": "BTFC2",
                        "venue": "sarasota football club",
                        "field": "sarasota football club field 1"
                    },
                    {
                        "time": "1:00 PM",
                        "home_team": "SPFC Aztecs 2",
                        "away_team": "SFC HOOLIGANS",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    }
                ]
            },
            # December 14, 2025
            {
                "date": datetime(2025, 12, 14),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "Disston City Soccer Club",
                        "away_team": "SFC United 2",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "9:00 AM",
                        "home_team": "SFC HOOLIGANS",
                        "away_team": "BTFC2",
                        "venue": "seminole rec fields",
                        "field": "seminole rec field"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "Charlotte Premier",
                        "away_team": "SPFC Aztecs 2",
                        "venue": "charlotte county regional park",
                        "field": "charlotte regional park"
                    }
                ]
            },
            # January 11, 2026
            {
                "date": datetime(2026, 1, 11),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "Disston City Soccer Club",
                        "away_team": "BTFC2",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "Charlotte Premier",
                        "away_team": "SFC HOOLIGANS",
                        "venue": "charlotte county regional park",
                        "field": "charlotte regional park"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SPFC Aztecs 2",
                        "away_team": "SFC United 2",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    }
                ]
            },
            # January 25, 2026
            {
                "date": datetime(2026, 1, 25),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "SPFC Aztecs 2",
                        "away_team": "Disston City Soccer Club",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "Charlotte Premier",
                        "away_team": "BTFC2",
                        "venue": "charlotte county regional park",
                        "field": "charlotte regional park"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC United 2",
                        "away_team": "SFC HOOLIGANS",
                        "venue": "sarasota football club",
                        "field": "sarasota football club field 1"
                    }
                ]
            },
            # February 15, 2026
            {
                "date": datetime(2026, 2, 15),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "Disston City Soccer Club",
                        "away_team": "SFC HOOLIGANS",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "Charlotte Premier",
                        "away_team": "SFC United 2",
                        "venue": "charlotte county regional park",
                        "field": "charlotte regional park"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SPFC Aztecs 2",
                        "away_team": "BTFC2",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    }
                ]
            },
            # February 22, 2026
            {
                "date": datetime(2026, 2, 22),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "SFC HOOLIGANS",
                        "away_team": "SPFC Aztecs 2",
                        "venue": "seminole rec fields",
                        "field": "seminole rec field"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "Charlotte Premier",
                        "away_team": "Disston City Soccer Club",
                        "venue": "charlotte county regional park",
                        "field": "charlotte regional park"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC United 2",
                        "away_team": "BTFC2",
                        "venue": "sarasota football club",
                        "field": "sarasota football club field 1"
                    }
                ]
            },
            # March 8, 2026
            {
                "date": datetime(2026, 3, 8),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "Disston City Soccer Club",
                        "away_team": "SFC United 2",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "BTFC2",
                        "away_team": "SFC HOOLIGANS",
                        "venue": "jc handley",
                        "field": "jc handley field 2"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SPFC Aztecs 2",
                        "away_team": "Charlotte Premier",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    }
                ]
            },
            # March 15, 2026
            {
                "date": datetime(2026, 3, 15),
                "matches": [
                    {
                        "time": "9:00 AM",
                        "home_team": "BTFC2",
                        "away_team": "Disston City Soccer Club",
                        "venue": "jc handley",
                        "field": "jc handley field 2"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC United 2",
                        "away_team": "SPFC Aztecs 2",
                        "venue": "sarasota football club",
                        "field": "sarasota football club field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "SFC HOOLIGANS",
                        "away_team": "Charlotte Premier",
                        "venue": "seminole rec fields",
                        "field": "seminole rec field"
                    }
                ]
            },
            # March 29, 2026
            {
                "date": datetime(2026, 3, 29),
                "matches": [
                    {
                        "time": "TBD",
                        "home_team": "SFC HOOLIGANS",
                        "away_team": "SFC United 2",
                        "venue": "seminole rec fields",
                        "field": "seminole rec field"
                    },
                    {
                        "time": "9:00 AM",
                        "home_team": "Disston City Soccer Club",
                        "away_team": "SPFC Aztecs 2",
                        "venue": "puryear park",
                        "field": "puryear park field 1"
                    },
                    {
                        "time": "11:00 AM",
                        "home_team": "BTFC2",
                        "away_team": "Charlotte Premier",
                        "venue": "jc handley",
                        "field": "jc handley field 2"
                    }
                ]
            }
        ]
        
        # Create matches
        matches_created = 0
        for matchday in schedule_data:
            for match_data in matchday["matches"]:
                home_team = team_map.get(match_data["home_team"])
                away_team = team_map.get(match_data["away_team"])
                
                if not home_team or not away_team:
                    print(f"Warning: Team not found for match {match_data['home_team']} vs {match_data['away_team']}")
                    continue
                
                match = Match(
                    match_date=matchday["date"],
                    match_time=match_data["time"],
                    home_team_id=home_team.id,
                    away_team_id=away_team.id,
                    league_id=league.id,
                    venue_name=match_data["venue"],
                    field_name=match_data["field"],
                    full_location=f"{match_data['venue']} - {match_data['field']}",
                    match_type="Regular Season",
                    division="men second (11v11)",
                    status=MatchStatusEnum.SCHEDULED
                )
                
                db.add(match)
                matches_created += 1
        
        db.commit()
        
        print(f"Successfully created {matches_created} matches for Suncoast League")
        print(f"Schedule spans from {schedule_data[0]['date'].strftime('%B %d, %Y')} to {schedule_data[-1]['date'].strftime('%B %d, %Y')}")
        
    except Exception as e:
        db.rollback()
        print(f"Error creating match data: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("Creating Suncoast League match schedule...")
    create_suncoast_matches()
    print("Match schedule creation completed!")
