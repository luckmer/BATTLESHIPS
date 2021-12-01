export interface shipInterface {
  id: number;
  name: string;
  size: number;
  count: number;
  hitPoints: number;
  hits: number;
}

export interface ShipProps {
  locations: string[];
  id: number;
  name: string;
  size: number;
  count: number;
  hitPoints: number;
  hits: number;
}
