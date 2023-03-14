import { Link } from "react-router-dom";
import { Menu } from "antd";

// 渲染link菜单
function renderMenuItem(menu: any) {
  return (
    <Menu.Item key={menu.key}>
      <Link to={menu.key}>
        <span>{menu.title}</span>
      </Link>
    </Menu.Item>
  );
}

// 渲染有子菜单的subMenu
function renderSubMenu(subMenu: any) {
  return (
    <Menu.SubMenu
      key={subMenu.key}
      title={
        <span>
          {/* {subMenu.icon && <Icon type={subMenu.icon} />} */}
          <span>{subMenu.title}</span>
        </span>
      }
    >
      {subMenu.subs && subMenu.subs.map((menu: any) => renderMenuItem(menu))}
    </Menu.SubMenu>
  );
}
export default renderSubMenu;
