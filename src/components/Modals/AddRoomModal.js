import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../context/AuthProvider";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });

    form.resetFields();

    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Create a Room"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter room's name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
