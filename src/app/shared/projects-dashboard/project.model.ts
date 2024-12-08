export interface Project {
  id: number;
  name: string;
  mapImage: string;
  autoScroll?: {
    x: number; 
    y: number; 
  };
  points: Point[];
}

export interface Point {
  id: number;
  name: string;
  type: PointTypeEnum; 
  isProject: boolean;  
  paths?: PathToPoints[]; 
  logo?: URL;
  position: { 
    x: number; 
    y: number; 
  };
}

export const pointTypes: PointType[] = [
  {
    id: 1,
    type: "mosque",
    class: "fa-solid fa-moon",
  },
  {
    id: 2,
    type: "school",
    class: "fa-solid fa-graduation-cap",
  },
  {
    id: 3,
    type: "restaurant",
    class: "fa-solid fa-utensils",
  },
  {
    id: 4,
    type: "mall",
    class: "fa-solid fa-cart-shopping",
  },
  {
    id: 5,
    type: "hospital",
    class: "fa-solid fa-circle-h",
  },
  {
    id: 6,
    type: "project",
    class: "",
  },
];


export enum PointTypeEnum {
  MOSQUE = 'mosque',
  SCHOOL = 'school',
  RESTAURANT = 'restaurant',
  MALL = 'mall',
  HOSPITAL = 'hospital',
  PROJECT = 'project',
}

export interface PathToPoints {
  point: Point;  
  path: Path[];
  time?: string;
}

export interface Path {
  id: number;
  x: number; 
  y: number; 
}

export interface PointType {
  id: number;
  type: string; 
  class: string; 
}
