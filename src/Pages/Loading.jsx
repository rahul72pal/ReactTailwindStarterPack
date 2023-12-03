import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen -mt-7 gap-6">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-[150px] w-[150px]"></div>
      <div className='text-[36px] text-white '> Loading.....</div>
    </div>
  );
};

export default Loading;
