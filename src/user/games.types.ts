export interface OwnedGameInfo {
  appid: number;
  playtime_2weeks?: number;
  playtime_forever?: number;
  playtime_windows_forever?: number;
  playtime_mac_forever?: number;
  playtime_linux_forever?: number;
  playtime_deck_forever?: number;
  rtime_last_played?: number;
  playtime_disconnected?: number;
}

export interface OwnedGamesInfo {
  game_count: number;
  games: OwnedGameInfo[];
  userId: string;
}

export interface GameInfo {
  appid: number;
  name: string;
}
