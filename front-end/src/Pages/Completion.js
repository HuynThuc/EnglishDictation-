import React from 'react';

const Completion = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-16 w-[32rem] text-center bg-gray-50">
                <p className="text-3xl text-gray-700 mb-6">
                    You have completed this exercise, <br /> good job!
                </p>
                <div className="text-6xl text-green-600">✔</div>
            </div>
        </div>
    );
};

export default Completion;