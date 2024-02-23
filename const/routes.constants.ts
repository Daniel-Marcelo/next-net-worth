export enum Route {
  Dashboard = "/dashboard",
  Account = "/account",
}

export const RouteToNavIndex = new Map([
  [Route.Dashboard, 0],
  [Route.Account, 1],
]);

export const NavIndexToRoute = new Map([
  [0, Route.Dashboard],
  [1, Route.Account],
]);
