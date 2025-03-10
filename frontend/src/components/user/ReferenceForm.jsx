import React, { useState, useEffect, useContext } from 'react'
import ResultModal from '../common/ResultModal';

function ReferenceForm({ context }) {
    const MAX_SIZE = 30 * 1024 * 1024;
    const MAX_COUNT = 3;
    const { setFormData } = useContext(context);
    const [files, setFiles] = useState([]);
    const [totalFileSize, setTotalFileSize] = useState(0);
    const [isOutOfCount, setIsOutOfCount] = useState(false);
    const [isOutOfSize, setIsOutOfSize] = useState(false);

    const handleFileChange = (e) => {
        e.preventDefault();
        const prevCount = files.length;
        const currentCount = e.target.files.length;
        const prevSize = Array.from(files).reduce((acc, file) => acc + file.size, 0);
        const currentSize = Array.from(e.target.files).reduce((acc, file) => acc + file.size, 0);

        if (prevCount + currentCount > MAX_COUNT) {
            setIsOutOfCount(true);
            return;
        }

        if (prevSize + currentSize > MAX_SIZE) {
            setIsOutOfSize(true);
            return;
        }

        setFiles((prev) => [...prev, ...e.target.files])
    }

    const handleRemoveImageFile = (e, index) => {
        e.preventDefault();
        setFiles((prev) => prev.filter((_, i) => index !== i));
    }

    const handleRemoveImageFileAll = (e) => {
        e.preventDefault();
        setFiles([]);
        setTotalFileSize(0);
    }

    const handleCloseModal = (e) => {
        e.preventDefault();
        setIsOutOfCount(false);
        setIsOutOfSize(false);
    }

    useEffect(() => {
        setFormData((prev) => ({ ...prev, files: files }));
        setTotalFileSize(Array.from(files).reduce((acc, file) => acc + file.size, 0));
    }, [files])

    return (
        <div>
            <div className='mb-2 flex items-center justify-end font-body font-semibold text-xs lg:text-sm space-x-4'>
                <div>파일: {files.length}개</div>
                <div>용량: {Math.ceil(totalFileSize / 1024 / 1024)}MB/{MAX_SIZE / 1024 / 1024}MB</div>
                <button onClick={handleRemoveImageFileAll}>전체삭제</button>
            </div>

            <div className='w-full h-28 lg:h-32 p-1 lg:p-2 border block rounded-md overflow-hidden bg-white'>
                {files.length > 0 ? files.map((file, index) => (
                    <div key={index} className='mb-1 p-1 border-b flex justify-between items-center text-sm lg:text-base'>
                        <div>{file.name}</div>
                        <button onClick={(e) => handleRemoveImageFile(e, index)}>✖</button>
                    </div>
                )) :
                    <div className='p-0 lg:p-1 text-[10px] lg:text-sm font-semibold font-body text-gray-400 space-y-0 lg:space-y-2'>
                        <p>시공예정 현장의 도면, 사진 및 원하시는 디자인 참고사항에 대한 파일이 있으시다면 첨부해주세요.</p>
                        <p>파일은 최대 3개까지 첨부가 가능하며 첨부할 수 있는 전체 파일의 최대 크기는 30MB 입니다. </p>
                    </div>
                }
            </div>

            {files.length < 3 &&
                <label className='block w-full border rounded-md bg-white'>
                    <div className='flex items-center hover:cursor-pointer pb-1'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8 text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16v-8m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                            />
                        </svg>
                        <div className='ml-2 mt-2 font-body font-semibold text-gray-600'>파일을 선택해 주세요.</div>
                    </div>
                    <input
                        type="file"
                        multiple={true}
                        className='hidden'
                        onChange={handleFileChange}
                    />
                </label>
            }

            {isOutOfCount &&
                <ResultModal
                    title={"경고: 파일 개수 초과"}
                    content={"첨부할 수 있는 파일은 최대 3개입니다."}
                    callbackFn={(e) => handleCloseModal(e)}
                />
            }

            {isOutOfSize &&
                <ResultModal
                    title={"경고: 파일 용량 초과"}
                    content={`전체 파일 용량은 ${MAX_SIZE / 1024 / 1024}MB를 초과할 수 없습니다.`}
                    callbackFn={(e) => handleCloseModal(e)}
                />
            }
        </div>
    )
}

export default ReferenceForm