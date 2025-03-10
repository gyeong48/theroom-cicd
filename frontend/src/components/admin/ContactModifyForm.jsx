import React, { useState, useContext } from 'react'
import AddressBox from '../common/AddressBox'
import { ContactModifyContext } from '../../context/ContactModifyProvider'
import GridInputBox from '../common/GridInputBox';
import GridSelectBox from '../common/GridSelectBox';
import CheckModal from '../common/CheckModal';
import { useNavigate, useParams } from 'react-router-dom';
import StatusToggleButton from './StatusToggleButton';
import { defaultDate } from '../../util/localDate';
import { deleteContact, getDownloadFile, putModifyContact } from '../../api/contactApi';
import FetchingModal from '../common/FetchingModal';
import useCustomMove from '../../hooks/useCustomMove';
import DatePicker from '../user/DatePicker';

function ContactModifyForm() {
    const { id } = useParams()
    const localDate = defaultDate
    const context = ContactModifyContext;
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(context);
    const [isModifiable, setIsModifiable] = useState(false);
    const [memo, setMemo] = useState(formData["memo"]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFetchingModalOpen, setIsFetchingModalOpen] = useState(false);
    const { moveToAdminError } = useCustomMove();

    const handleChange = (e) => {
        setMemo(e.target.value)
        setFormData((prev) => ({ ...prev, memo: e.target.value }))
    }

    const handleModify = (e) => {
        e.preventDefault();
        setIsModifiable(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModifiable(false);
        const contactModifyFormData = new FormData();

        contactModifyFormData.append("customer", formData.customer);
        contactModifyFormData.append("email", formData.email);
        contactModifyFormData.append("phoneNumber", formData.phoneNumber);
        contactModifyFormData.append("buildingType", formData.buildingType);
        contactModifyFormData.append("exclusiveArea", formData.exclusiveArea ? formData.exclusiveArea : 0);
        contactModifyFormData.append("startDate", formData.startDate === "" ? localDate : formData.startDate);
        contactModifyFormData.append("moveInDate", formData.moveInDate === "" ? localDate : formData.moveInDate);
        contactModifyFormData.append("mainAddress", formData.mainAddress);
        contactModifyFormData.append("detailAddress", formData.detailAddress);
        contactModifyFormData.append("postCode", formData.postCode);
        contactModifyFormData.append("latitude", formData.latitude ? formData.latitude : 0);
        contactModifyFormData.append("longitude", formData.longitude ? formData.longitude : 0);
        contactModifyFormData.append("budget", formData.budget ? formData.budget : 0);
        contactModifyFormData.append("interiorType", formData.interiorType === "" ? "ALL" : formData.interiorType);
        contactModifyFormData.append("memo", formData.memo);
        contactModifyFormData.append("status", formData.status);
        contactModifyFormData.append("customerMemo", formData.customerMemo);

        for (const [key, value] of contactModifyFormData.entries()) {
            console.log(`${key} : ${value}`);
        }

        putModifyContact(id, contactModifyFormData)
            .then(res => {
                setIsFetchingModalOpen(false);
            })
            .catch(err => {
                console.log(err);
                moveToAdminError();
            })

        setIsFetchingModalOpen(true);
    }

    const handleOpenModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const handleCheck = () => {
        deleteContact(id).then(res => {
            setIsModalOpen(false);
            navigate({ pathname: "../contact" });
        })

    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleDownload = async (e, file) => {
        e.preventDefault();

        try {
            const response = await getDownloadFile(file.uploadedName, file.name);
            console.log(response);

            if (!response.ok) {
                throw new Error('File download failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    return (
        <form className="pt-10 space-y-14">
            <div className='font-body'>
                <div className='text-lg font-medium mb-1'>
                    <h4>1. 고객정보 <small>(필수*)</small></h4>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 lg:space-x-4 lg:space-y-0 space-y-2'>
                    <GridInputBox
                        label={"이름"}
                        id={"customer"}
                        type={"text"}
                        placeholder={"이름을 입력해주세요"}
                        context={context}
                        isModifiable={isModifiable}
                        errors={null}
                        setErrors={null}
                    />
                    <GridInputBox
                        label={"이메일"}
                        id={"email"}
                        type={"email"}
                        placeholder={"이메일을 입력해주세요"}
                        context={context}
                        isModifiable={isModifiable}
                        errors={null}
                        setErrors={null}
                    />
                    <GridInputBox
                        label={"연락처"}
                        id={"phoneNumber"}
                        type={"text"}
                        placeholder={"연락처를 입력해주세요"}
                        context={context}
                        isModifiable={isModifiable}
                        errors={null}
                        setErrors={null}
                    />
                </div>
            </div>

            <div className='font-body '>
                <div className='text-lg font-medium mb-1'>
                    <h4>2. 건물정보 <small>(필수*)</small></h4>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 mb-2 lg:space-y-0 space-y-2'>
                    <GridSelectBox
                        isLabel={true}
                        label={"유형"}
                        id={"buildingType"}
                        options={[{ value: "APARTMENT", content: "아파트" }, { value: "SMALL_APARTMENT", content: "빌라" }, { value: "HOUSE", content: "주택" }, { value: "COMMERCIAL", content: "상가" }]}
                        placeholder={"선택"}
                        context={context}
                        isModifiable={isModifiable}
                        errors={null}
                        setErrors={null}
                    />
                    <GridInputBox
                        label={"면적"}
                        id={"exclusiveArea"}
                        type={"number"}
                        placeholder={"분양 면적을 입력해주세요 - 단위: 평"}
                        context={context}
                        isModifiable={isModifiable}
                        errors={null}
                        setErrors={null}
                    />
                </div>

                {/* 주소 검색 */}
                <AddressBox context={context} isModifiable={isModifiable}
                    errors={null}
                    setErrors={null}
                />
            </div>

            <div className='font-body'>
                <div className='text-lg font-medium mb-1'>
                    <h4>3. 공사정보</h4>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 lg:space-y-0 space-y-2'>
                    <DatePicker label={"공사예정일"} id={"startDate"} context={context} />
                    <DatePicker label={"입주예정일"} id={"moveInDate"} context={context} />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 mb-2 lg:space-y-0 space-y-2'>
                    <GridInputBox
                        label={"공사예산"}
                        id={"budget"}
                        type={"number"}
                        placeholder={"단위: 만원"}
                        context={context}
                        isModifiable={isModifiable}
                        errors={null}
                        setErrors={null}
                    />
                    <GridSelectBox
                        isLabel={true}
                        label={"공사범위"}
                        id={"interiorType"}
                        placeholder={"선택"}
                        options={[{ value: "PART", content: "부분시공" }, { value: "ALL", content: "전체시공" }]}
                        context={context}
                        isModifiable={isModifiable}
                        errors={null}
                        setErrors={null}
                    />
                </div>
            </div>

            <div className='font-body space-y-4'>
                <div className='text-lg font-medium mb-1'>
                    <h4>4. 진행사항</h4>
                </div>
                {/**파일 다운로드*/}
                {!isModifiable &&
                    <div>
                        <label htmlFor="name" className="block text-sm lg:text-base font-semibold text-gray-700">
                            파일
                        </label>
                        <div className='w-full h-28 lg:h-32 p-2 border block rounded-md overflow-hidden bg-white'>
                            {formData.files.length > 0 && formData.files.map((file, index) => (
                                <div
                                    key={index}
                                    className='mb-1 p-1 border-b flex justify-between items-center text-sm lg:text-base'
                                >
                                    <div>{file.name}</div>
                                    <button onClick={(e) => handleDownload(e, file)} className='text-sm lg:text-base'>내려받기</button>
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {/**고객 메모 */}
                <div className='w-full'>
                    <label htmlFor="name" className="block text-sm lg:text-base font-semibold text-gray-700">
                        고객요청사항
                    </label>
                    <textarea
                        id={"customerMemo"}
                        name={"customerMemo"}
                        value={formData.customerMemo}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-sm lg:text-base placeholder:text-xs lg:placeholder:text-sm`}
                        placeholder={"고객 요청 사항이 없습니다."}
                        rows={5}
                        readOnly={true}
                    />
                </div>

                {/**메모기입란 */}
                <div className='w-full'>
                    <label htmlFor="name" className="block text-sm lg:text-base font-semibold text-gray-700">
                        메모
                    </label>
                    <textarea
                        id={"memo"}
                        name={"memo"}
                        value={memo}
                        onChange={handleChange}
                        className={`w-full p-1 border-b border-gray-300 focus:outline-none text-sm lg:text-base placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base ${!isModifiable ? "bg-gray-100" : "bg-white"}`}
                        placeholder={"비어있음"}
                        rows={5}
                        readOnly={!isModifiable}
                    />
                </div>

                {/**진행 상태 표시*/}
                <div>
                    <label htmlFor="name" className="block text-sm lg:text-base font-semibold text-gray-700">
                        프로세스
                    </label>
                    <StatusToggleButton context={context} isModifiable={isModifiable} />
                </div>
            </div>

            <div className='flex justify-center items-center'>
                {isModifiable ?
                    <div className='flex justify-center space-x-6'>
                        <button
                            onClick={handleSubmit}
                            className='text-xs px-4 py-2 lg:text-base lg:px-6 lg:py-2 font-body bg-black hover:opacity-75 text-white rounded-md'
                        >
                            저장
                        </button>
                        <button
                            onClick={handleOpenModal}
                            className='text-xs px-4 py-2 lg:text-base lg:px-6 lg:py-2 font-body bg-red-400 hover:opacity-75 text-white rounded-md'
                        >
                            삭제
                        </button>
                    </div>
                    :
                    <button
                        onClick={handleModify}
                        className='text-xs px-4 py-2 lg:text-base lg:px-6 lg:py-2 font-body bg-black hover:opacity-75 text-white rounded-md'
                    >
                        수정
                    </button>
                }
            </div>
            {isModalOpen &&
                <CheckModal
                    title={"확인: 견적문의 삭제"}
                    content={"현재 문의 건을 삭제하시겠습니까?"}
                    checkFn={handleCheck}
                    cancelFn={handleCancel}
                />
            }

            {isFetchingModalOpen &&
                <FetchingModal />
            }
        </form>
    )
}

export default ContactModifyForm