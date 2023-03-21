import { useState, useEffect } from "react";
import Routes from "./router";
import { connect } from "react-redux";
import useTheme from "@/hooks/useTheme";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import i18n from "i18next";
import { getBrowserLang } from "@/utils/util";
import { setLanguage } from "@/store/modules/global/action";
import AuthRouter from "@/router/utils/authRouter";
function App(props: any) {
	const { language, assemblySize, themeConfig, setLanguage } = props;
	const [i18nLocale, setI18nLocale] = useState(zhCN);
	console.log(language, assemblySize, themeConfig, setLanguage);
	useTheme(themeConfig);

	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language == "zh") return setI18nLocale(zhCN);
		if (language && language == "en") return setI18nLocale(enUS);
		if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() == "en") return setI18nLocale(enUS);
	};

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		setLanguage(language || getBrowserLang());
		setAntdLanguage();
	}, [language]);

	return (
		<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
			<AuthRouter>
				<Routes />
			</AuthRouter>
		</ConfigProvider>
	);
}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);
