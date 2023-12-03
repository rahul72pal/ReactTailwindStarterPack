import React from 'react';
import Iconbtn from './Iconbtn';

const ConfirmationModal = ({ modalData }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-500 backdrop-blur">
            <div className="bg-richblack-700   p-[40px] rounded-lg shadow-md ">
                <p className="text-lg font-semibold mb-2">{modalData.text1}</p>
                <p className="text-sm text-gray-600 mb-4">{modalData.text2}</p>

                {modalData.btn1Handler && (
                    <Iconbtn
                        onclickfunction={modalData.btn1Handler}
                        text={modalData.btn1Text}
                        customClasses={`bg-yellow-50 text-black px-3 py-1 rounded-md mr-2`}
                    />
                )}

                {modalData.btn2Handler && (
                    <button
                        onClick={modalData.btn2Handler}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2"
                    >
                        {modalData.btn2Text}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ConfirmationModal;
