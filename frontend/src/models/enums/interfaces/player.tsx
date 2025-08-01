interface Player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    jersey_number?: number;
    is_captain: boolean;
    goals: number;
    assists: number;
    clean_sheets?: number;
    appearances: number;
    yellow_cards: number;
    red_cards: number;
    joined_at?: string;
    profile_image_url?: string;
  }

export default Player;