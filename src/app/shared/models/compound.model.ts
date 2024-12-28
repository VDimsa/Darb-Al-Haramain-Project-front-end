export interface Compound {
    id: number;
    name: string;
    description?: string;
    location: Location;
    status: CompoundStatus;
    buildings: BuildingInCompound[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface BuildingInCompound {
    id: number;
    name: string;
    status: BuildingStatus;
    borders: Border[];
  }
  
  export interface Location {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  }
  
  export interface Border {
    coordinates: Coordinate[];
    color?: string;
    visible: boolean;
    data?: BorderData;
  }
  
  export interface Coordinate {
    x: number;
    y: number;
  }
  
  export interface BorderData {
    name: string;
    description?: string;
    [key: string]: any;
  }
  
  export enum CompoundStatus {
    ACTIVE = 'active',
    UNDER_CONSTRUCTION = 'under_construction',
    COMPLETED = 'completed',
    DEACTIVATED = 'deactivated',
  }
  
  export enum BuildingStatus {
    ACTIVE = 'active',
    UNDER_MAINTENANCE = 'under_maintenance',
    DECOMMISSIONED = 'decommissioned',
    RESERVED = 'reserved',
  }
    