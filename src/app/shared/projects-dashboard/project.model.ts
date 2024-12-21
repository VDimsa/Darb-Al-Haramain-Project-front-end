export interface Project {
  id: number | null;
  name: string;
  mapImage: string | File | null;
  logo?: string | File | null;
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
  pointMap?: string | File | null;
  visible: boolean;
  paths?: PathToPoints[]; 
  logo?: string | File | null;
  importance: number;
  borders?: {
    x: number; 
    y: number; 
  }[];
  position: { 
    x: number; 
    y: number; 
  };
}

export interface ProjectsMap {
  projectId: number | null;
  pointId: number | null;
  mapImage: string | File | null;
  borders: Border[];
} 

export interface Border {
  Cordinates: {
    x: number; 
    y: number; 
  }[],
  color?: string;
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
  id?: number;
  x: number; 
  y: number; 
}

export interface PointType {
  id: number;
  type: string; 
  class: string; 
}
