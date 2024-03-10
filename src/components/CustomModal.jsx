import React from 'react';
import { Button, Modal } from 'antd';

const CustomModal = ({ width, isOpen, setIsOpen, children,label }) => {
    return (
        <Modal
            title={<div style={{ fontSize: '24px', textAlign: 'center'}}>{label}</div>} // title için özelleştirilmiş font boyutu ve merkeze hizalama
            style={{ top: 20,overflow:'scroll' }} // Modalın üst kısmından 20px aşağıda başlamasını sağlar
            width={width || 500} // Eğer width prop'u verilmezse varsayılan olarak 500px genişlik kullan
            open={isOpen}
            onOk={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            footer={null} // Modalın alt kısmındaki butonları iptal eder
        >
            {children}
        </Modal>
    );
};

export default CustomModal;