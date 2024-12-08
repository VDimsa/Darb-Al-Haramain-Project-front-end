export interface Project {
  id: number;
  name: string;
  mapImage: string;
  points: Point[];
}

export interface Point {
  id: number;
  name: string;
  type: string;
  isProejct: boolean;
  position: {
    x: number; 
    y: number; 
  };
}

export interface PointType {
  id: number;
  type: string;
  class: string;
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
];
