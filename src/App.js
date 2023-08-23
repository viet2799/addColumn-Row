import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [outputData, setOutputData] = useState([]);

  const handleAddRow = () => {
    setRowData([...rowData, '']);
  };

  const handleAddCol = () => {
    setColData([...colData, '']);
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const updatedRowData = [...rowData];
    const updatedColData = [...colData];

    updatedRowData[rowIndex] = e.target.value;
    updatedColData[colIndex] = e.target.value;

    setRowData(updatedRowData);
    setColData(updatedColData);
  };

  const handleConfirm = () => {
    const extractedData = rowData.map((rowValue, rowIndex) => {
      const rowData = {};
      colData.forEach((colValue, colIndex) => {
        rowData[`cell${rowIndex}-${colIndex}`] = rowValue;
      });
      return { key: `row${rowIndex}`, ...rowData };
    });
    setOutputData(extractedData);
  };

  return (
    <div>
      <Button onClick={handleAddRow}>Thêm hàng</Button>
      <Button onClick={handleAddCol}>Thêm cột</Button>
      <Table
        dataSource={rowData.map((row, rowIndex) => {
          const rowData = {};
          colData.forEach((col, colIndex) => {
            rowData[`cell${rowIndex}-${colIndex}`] = '';
          });
          return { key: `row${rowIndex}`, ...rowData };
        })}
        columns={colData.map((col, colIndex) => ({
          dataIndex: `cell${colIndex}-${rowData.length - 1}`,
          key: `col${colIndex}`,
          render: (text, record, rowIndex) => (
            <Input
              value={text}
              onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
            />
          ),
        }))}
        pagination={false}
      />
      <Button onClick={handleConfirm}>Xác nhận</Button>
      <div>
        <h2>Dữ liệu đã xác nhận:</h2>
        <pre>{JSON.stringify(outputData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;