export interface Dev {
  _id: string;
  name: string;
  bio: string;
  techs: string[];
  avatar_url: string;
  github_username: string;
  location: Location;
  __v: number;
}

interface Location {
  _id: string;
  type: 'Point';
  coordinates: [number, number];
}
