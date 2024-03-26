export enum Route {
  Dashboard = "/dashboard",
  Search = "/search",
  Account = "/account",
}

export const RouteToNavIndex = new Map([
  [Route.Dashboard, 0],
  [Route.Search, 1],
  [Route.Account, 2],
]);

export const NavIndexToRoute = new Map([
  [0, Route.Dashboard],
  [1, Route.Search],
  [2, Route.Account],
]);
