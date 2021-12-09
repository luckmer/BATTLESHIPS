export interface arrInterface {
  attacked: number[];
  name: string;
  size: string | number;
}
export interface PropsInterface {
  notification: {
    status: boolean;
    response: string;
  };
  destroyedBoats: {
    player: arrInterface[] | undefined;
    ai: arrInterface[] | undefined;
  };
}
