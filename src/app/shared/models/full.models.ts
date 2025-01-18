interface Cordinate {
    x: number;
    y: number;
  }
  
  interface Border {
    id: string;
    cordinate: Cordinate[];
    color: string;
  }
  
  interface Point {
    id: string;
    name: string;
    type: string;
    class: string;
  }
  
  interface Project {
    id: string;
    name: string;
    logo: string;
    border: Border[];
  }
  
  interface Compound {
    id: string;
    name: string;
    logo: string;
    border: Border[];
  }
  
  interface Mega {
    id: string;
    name: string;
    logo: string;
  }
  
  interface Path {
    id: string;
    from_id: string;
    to_id: string;
    cordinate: Cordinate[];
  }
  
  interface ProjectMap {
    id: string;
    name: string;
    img: string;
    point: Point[];
    data: Project[] | Compound[] | Mega[];
    path: Path[];
  }
  
  interface Building {
    id: string;
    name: string;
    border: Border[];
  }
  
  interface Floor {
    id: string;
    number: number;
    border: Border[];
  }
  
  interface Apartment {
    id: string;
    number: number;
    name: string;
    border: Border[];
    arModel?: string; // AR model is optional
  }
  
  interface BuildingWithFloors extends Building {
    floor: Floor[];
    apartment: Apartment[];
  }
  
  interface CompoundWithBuildings extends Compound {
    building: BuildingWithFloors[];
  }
  
  interface ProjectWithCompounds extends Project {
    compound: CompoundWithBuildings[];
  }
  
  interface FloorWithApartments extends Floor {
    apartment: Apartment[];
  }