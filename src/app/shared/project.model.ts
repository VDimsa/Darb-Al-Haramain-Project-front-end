export interface Point {
    id: number;
    type: 'school' | 'hospital' | 'building' | string;
    position: {
      x: number; 
      y: number; 
    };
  }
  
  export interface Project {
    id: number;
    name: string;
    mapImage: string;
    points: Point[];
  }
  