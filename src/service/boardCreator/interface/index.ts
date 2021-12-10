export interface mapInterface {
  id: number;
  name: string;
  placer: string;
  location: number;
  used: boolean;
  enemyUsed: boolean;
  attacked: number[];
  attack: boolean;
  miss?: boolean;
}

export interface arrInterface {
  attacked: number[];
  name: string;
  size: string | number;
}
