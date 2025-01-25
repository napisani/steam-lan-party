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
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string | null;
  pc_requirements: Requirements;
  mac_requirements: Requirements;
  linux_requirements: Requirements;
  developers: string[];
  publishers: string[];
  price_overview: PriceOverview;
  packages: number[];
  package_groups: PackageGroup[];
  platforms: Platforms;
  metacritic: Metacritic;
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  recommendations: Recommendations;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  background_raw: string;
  content_descriptors: ContentDescriptors;
  ratings: Ratings;
}

interface Requirements {
  minimum: string;
}

interface PriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
}

interface PackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: Subscription[];
}

interface Subscription {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

interface Metacritic {
  score: number;
  url: string;
}

interface Category {
  id: number;
  description: string;
}

interface Genre {
  id: string;
  description: string;
}

interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

interface Recommendations {
  total: number;
}

interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}

interface SupportInfo {
  url: string;
  email: string;
}

interface ContentDescriptors {
  ids: number[];
  notes: string;
}

interface Ratings {
  usk: Rating;
  dejus: RatingWithDescriptors;
  steam_germany: RatingWithDescriptors;
}

interface Rating {
  rating: string;
}

interface RatingWithDescriptors extends Rating {
  rating_generated: string;
  required_age: string;
  banned: string;
  use_age_gate: string;
  descriptors: string;
}
