import React from "react";
("@/assets/index.less");
import { Table } from "antd";

interface TableProps {
	tableDatas: any[];
	columns: any[];
}

interface TableState {
	selectedRowKeys: any[];
}

class TableComponent extends React.Component<TableProps, TableState> {
	constructor(props: TableProps) {
		super(props);
		this.state = {
			selectedRowKeys: []
		};
	}

	onSelectChange = (selectedRowKeys: any[]) => {
		this.setState({ selectedRowKeys });
	};

	render() {
		const { tableDatas, columns } = this.props;
		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange
		};
		return (
			<Table
				columns={columns}
				dataSource={tableDatas}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 320 }}
				rowSelection={rowSelection}
			/>
		);
	}
}

export default TableComponent;
