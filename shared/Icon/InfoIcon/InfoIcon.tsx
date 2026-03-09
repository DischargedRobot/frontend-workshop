import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Tooltip } from 'antd';

interface Props {
  info?: string;
}

const InfoIcon = ({info}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!info) return null;

  return (
    info &&
    <Tooltip title={info}>
      <span
        onMouseEnter={() => {
            setIsHovered(true)
        }}
        onMouseLeave={() => {
            setIsHovered(false)
        }}
        style={{ 
          color: isHovered ? '#1890ff' : 'inherit',
          cursor: 'pointer',
        }}
      >
        <InfoCircleOutlined />
      </span>
    </Tooltip>
  );
};

export default InfoIcon