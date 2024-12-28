export interface TypeFilter {
    type: string;
    selected: boolean;
}

export interface FloorsFilter {
    floors: number;
    selected: boolean;
}

export interface AreaFilter {
    min: number;
    max: number;
}

export interface OccupancyFilter {
    min: number;
    max: number;
}
