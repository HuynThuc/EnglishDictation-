import React, { useRef } from 'react';

const PronunciationComponent = () => {
    const videoRef = useRef(null);

    const videoId = 'tpN9CPwZ-oE'; // Thay đổi video ID tại đây

    const handleButtonClick = (time) => {
        if (videoRef.current) {
            const iframe = videoRef.current;
            const playerUrl = `https://www.youtube.com/embed/${videoId}?start=${time}&autoplay=1`;
            iframe.src = playerUrl; // Cập nhật src của iframe để phát video từ thời gian chỉ định
        }
    };

    const buttons = [
        { label: 'short a', time: 56 },
        { label: 'short e', time: 64 },
        { label: 'short i', time: 71 },
        { label: 'short o', time: 89 },
        { label: 'short u', time: 97 },
        { label: 'long a', time: 107 },
        { label: 'long e', time: 116 },
        { label: 'long i', time: 123 },
        { label: 'long o', time: 132 },
        { label: 'long u', time: 141 },
        { label: 'long oo', time: 151 },
        { label: 'b', time: 177 },
        { label: 'k', time: 186 },
        { label: 'd', time: 194 },
        { label: 'f', time: 217 },
        { label: 'g', time: 227 },
        { label: 'h', time: 235 },
        { label: 'j', time: 242 },
        { label: 'l', time: 251 },
        { label: 'm', time: 266 },
        { label: 'n', time: 275 },
        { label: 'p', time: 300 },
        { label: 'r', time: 309 },
        { label: 's', time: 317 },
        { label: 't', time: 327 },
        { label: 'v', time: 344 },
        { label: 'w', time: 354 },
        { label: 'y', time: 363 },
        { label: 'z', time: 372 },
        { label: 'ch', time: 384 },
        { label: 'sh', time: 391 },
        { label: 'unvoiced /th', time: 404 },
        { label: 'voiced /th', time: 412 },
        { label: 'hw', time: 421 },
        { label: 'ng', time: 448 },
        { label: 'nk', time: 458 },
        { label: 'ur', time: 471 },
        { label: 'ar', time: 482 },
        { label: 'or', time: 491 },
        { label: 'oi', time: 503 },
        { label: 'ow', time: 526 },
        { label: 'oo', time: 534 },
        { label: 'aw', time: 541 },
        { label: 'zh', time: 550 },
    ];


    return (
        <div className="container mx-auto p-4">
            {/* Tiêu đề */}
            <h1 className="text-2xl font-bold text-center mb-4">
                Learn to pronounce 44 American English sounds
            </h1>
            <p className="text-center text-gray-600 mb-6">
    With{' '}
    <a
        href="https://www.youtube.com/user/theteachervanessa"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium underline"
    >
        Speak English With Vanessa
    </a>
</p>


            {/* Video */}
            <div className="flex justify-center mb-6">
                <iframe
                    ref={videoRef}
                    width="640"
                    height="390"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Các nút âm thanh */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 p-4">
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(btn.time)}
                        className={`rounded-lg border border-green-600 text-green-600 px-3 py-2 text-sm 

                            }`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>


        </div>
    );
};

export default PronunciationComponent;
