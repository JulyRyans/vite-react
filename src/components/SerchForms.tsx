import React from "react";
import "@/assets/index.less";
import { Row, Col, Input, Select, Button } from "antd";

interface SerchFormProps {
	formDatas: any[];
}

class SerchFormComponent extends React.Component<SerchFormProps> {
	renderItem = (dt: any) => {
		let component = <div />;
		switch (dt.type) {
			case "input":
				component = <Input style={{ width: "65%" }} placeholder="支持模糊查询" />;
				break;
			case "select":
				component = (
					<Select style={{ width: "65%" }} placeholder="请选择">
						{dt.data.map((v: any) => (
							<Select.Option key={v.key} value={v.name}>
								{v.name}
							</Select.Option>
						))}
					</Select>
				);
				break;
			case "button":
				component = (
					<>
						<Button type="primary" style={{ marginRight: "10px" }}>
							查询
						</Button>
						<Button>重置</Button>
					</>
				);
				break;
			default:
				break;
		}
		return component;
	};

	render() {
		const { formDatas } = this.props;
		return (
			<div className="form-content">
				<Row style={{ width: "100%", padding: "10px 6px" }}>
					{formDatas.map(dt => (
						<Col key={dt.key} span={dt.colWidth} style={{ marginBottom: "8px", marginLeft: `${dt.flex}` }}>
							<div style={{ display: "flex", lineHeight: "32px" }}>
								{dt.title && <span style={{ display: "inline-block", width: "90px" }}>{dt.title}:</span>}
								{this.renderItem(dt)}
							</div>
						</Col>
					))}
				</Row>
			</div>
		);
	}
}

export default SerchFormComponent;
