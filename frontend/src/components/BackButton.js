import { memo } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className="h-12 w-12 p-2 cursor-pointer mr-3 rounded-md hover:bg-gray-100"
      onClick={() => navigate('..')}
    >
      <ArrowLeftIcon />
    </div>
  );
};

export default memo(BackButton);
