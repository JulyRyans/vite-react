import * as types from "@/store/mutation-types";

// * setBreadcrumbList
export const setBreadcrumbList = (breadcrumbList: { [propName: string]: any }) => ({
	type: types.SET_BREADCRUMB_LIST,
	breadcrumbList
});
