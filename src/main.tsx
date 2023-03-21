import React from "react";
import "@/styles/common.less";
import "@/styles/reset.less";
import "@/assets/iconfont/iconfont.less";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import "@/language/index";
import App from "./App";

const container: any = document.getElementById("root");
const root = createRoot(container);
root.render(
	// 通过在应用入口添加 BrowserRouter 组件开启 React Router 功能
	<BrowserRouter>
		{/* <React.StrictMode> */}
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
		{/* </React.StrictMode> */}
	</BrowserRouter>
);
