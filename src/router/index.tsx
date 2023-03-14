import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/router/interface";
import Login from "@/pages/login/login";

// * 导入所有router
const metaRouters: any = import.meta.glob("./modules/*.tsx", { eager: true, import: "default" });

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(metaRouters[item][key]);
  });
});
console.log(metaRouters);


export const rootRouter: any[] = [
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login"
    }
  },
  ...routerArray,
  {
    path: "*",
    element: <Navigate to="/404" />
  }
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
