import React from 'react';
import { Modal } from 'antd'

interface ModalsState {
    isModalVisible: boolean
}
interface ModalsProps {
    isModalVisible: boolean,
    handleOk: () => void
}

class Modals extends React.Component<ModalsProps, ModalsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isModalVisible: this.props.isModalVisible
        }

    }
    handleOk = () => { this.setState({ isModalVisible: false }) }
    handleCancel = () => { this.setState({ isModalVisible: false }) }
    render() {
        const { isModalVisible } = this.props;
        return (
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleOk}
            >

            </Modal>
        )
    }
}

export default Modals;