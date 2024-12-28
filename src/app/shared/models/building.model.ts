export interface Building {
    id: number;
    name: string;
    description?: string;
    status: BuildingStatus;
    compoundId: number;
    location: Location;
    floors: Floor[];
    amenities?: Amenity[];
    urlVideo?: boolean;
    url?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Floor {
    floorNumber: number;
    apartments: Apartment[];
}

export interface Apartment {
    id: number;
    number: string;
    roomsCount: number;
    status: ApartmentStatus;
    floorNumber: number;
    buildingId: number;
}

export interface Location {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
}

export interface Amenity {
    id: number;
    name: string;
    description?: string;
    iconClass?: string;
}

export enum BuildingStatus {
    ACTIVE = 'active',
    UNDER_MAINTENANCE = 'under_maintenance',
    DECOMMISSIONED = 'decommissioned',
    RESERVED = 'reserved',
}

export enum ApartmentStatus {
    AVAILABLE = 'available',
    BOOKED = 'booked',
    SOLD = 'sold',
    UNDER_MAINTENANCE = 'under_maintenance',
}
