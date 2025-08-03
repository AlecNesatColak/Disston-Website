import { UUID } from "crypto";

interface Player {
    id: UUID;
    first_name: string;
    last_name: string;
    position: string;
    jersey_number?: number;
    is_captain: boolean;
    status: number;
    goals: number;
    assists: number;
    clean_sheets?: number;
    appearances: number;
    cards: {
      yellow: number;
      red: number;
    };
    joined_at?: string;
    profile_image_url?: string;
  }

export default Player;