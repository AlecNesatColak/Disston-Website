#!/bin/bash

# Script to run the league seed data
# Make sure the backend is running before executing this script

echo "Running league seed data script..."
echo "Make sure your backend server is running on http://localhost:8000"
echo ""

cd backend
python seed_league_data.py

echo ""
echo "Seed data script completed!"
echo "You can now view the league tables at http://localhost:3000/leagues"
