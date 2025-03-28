import React, { useState } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Select, message } from 'antd';
const { Content } = Layout;
const { Option } = Select;

const RoomAllotment = () => {
  const [rooms, setRooms] = useState([
    { key: '1', number: '101', status: 'Vacant', tenant: '' },
    { key: '2', number: '102', status: 'Occupied', tenant: 'John Doe' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    { title: 'Room Number', dataIndex: 'number', key: 'number' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleEditRoom(record)}>Assign Tenant</Button>
      ),
    },
  ];

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    form.setFieldsValue({ tenant: room.tenant });
    setIsModalVisible(true);
  };

  const handleAssignTenant = (values) => {
    const updatedRooms = rooms.map((room) =>
      room.key === selectedRoom.key ? { ...room, ...values, status: 'Occupied' } : room
    );
    setRooms(updatedRooms);
    message.success('Tenant assigned successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
      <Table dataSource={rooms} columns={columns} />
      <Modal
        title="Assign Tenant"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAssignTenant}>
          <Form.Item name="tenant" label="Tenant" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default RoomAllotment;
