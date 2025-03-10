import React, { useContext, useState } from 'react'
import GridInputBox from '../common/GridInputBox'
import GridSelectBox from '../common/GridSelectBox'
import AddressBox from '../common/AddressBox'
import ReferenceForm from './ReferenceForm'
import { ContactAddContext } from '../../context/ContactAddProvider'
import PersonalInformationForm from './PersonalInformationForm'
import { defaultDate } from '../../util/localDate'
import { postAddContact } from '../../api/contactApi'
import FetchingModal from '../common/FetchingModal'
import ResultModal from '../common/ResultModal'
import { useNavigate } from 'react-router-dom'
import { validate } from '../../util/validator'
import useCustomMove from '../../hooks/useCustomMove'
import DatePicker from './DatePicker'
import { useSelector } from 'react-redux'

function ContactAddForm() {
    const { isAuthenticated } = useSelector(state => state.loginSlice);
    const { moveToError } = useCustomMove();
    const navigate = useNavigate();
    const localDate = defaultDate;
    const context = ContactAddContext;
    const { formData } = useContext(context);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [isFetchingModalOpen, setIsFetchingModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [errors, setErrors] = useState({
        customer: "",
        exclusiveArea: "",
        phoneNumber: "",
        mainAddress: "",
        detailAddress: "",
        buildingType: "",
        personalInformationAgree: ""
    });
    const [customerMemo, setCustomerMemo] = useState("");

    const checkError = () => {
        const newErrors = Object.keys(errors).reduce((acc, key) => {
            const error = validate(key, formData[key]);

            if (error) acc[key] = error;
            return acc;
        }, {})

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return true;
        }

        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (checkError()) {
            setIsWarningModalOpen(true)
            return;
        }

        const contactFormData = new FormData();

        for (let i = 0; i < formData.files.length; i++) {
            contactFormData.append("files", formData.files[i]);
        }

        if (formData.files.length === 0) {
            contactFormData.append("files", null);
        }

        contactFormData.append("customer", formData.customer);
        contactFormData.append("email", formData.email);
        contactFormData.append("phoneNumber", formData.phoneNumber);
        contactFormData.append("buildingType", formData.buildingType ? formData.buildingType : "APARTMENT");
        contactFormData.append("exclusiveArea", formData.exclusiveArea ? formData.exclusiveArea : 0);
        contactFormData.append("startDate", formData.startDate === "" ? localDate : formData.startDate);
        contactFormData.append("moveInDate", formData.moveInDate === "" ? localDate : formData.moveInDate);
        contactFormData.append("mainAddress", formData.mainAddress);
        contactFormData.append("detailAddress", formData.detailAddress);
        contactFormData.append("postCode", formData.postCode);
        contactFormData.append("latitude", formData.latitude ? formData.latitude : 0);
        contactFormData.append("longitude", formData.longitude ? formData.longitude : 0);
        contactFormData.append("budget", formData.budget ? formData.budget : 0);
        contactFormData.append("interiorType", formData.interiorType === "" ? "ALL" : formData.interiorType);
        contactFormData.append("personalInformationAgree", formData.personalInformationAgree ? formData.personalInformationAgree : false);
        contactFormData.append("customerMemo", customerMemo);

        postAddContact(contactFormData)
            .then(res => {
                setIsFetchingModalOpen(false);
                setIsResultModalOpen(true);
            })
            .catch(err => {
                console.log(err);
                moveToError();
            })

        setIsFetchingModalOpen(true);
    }

    return (
        <div>
            <form className="pt-10 space-y-14">
                <div className='font-body'>
                    <div className='text-lg font-medium mb-1'>
                        <h4>1. 고객정보<small className="text-red-500">(필수*)</small></h4>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 lg:space-y-0 space-y-2'>
                        <GridInputBox
                            label={"이름"}
                            id={"customer"}
                            type={"text"}
                            placeholder={"이름을 입력해주세요"}
                            context={context}
                            isModifiable={true}
                            errors={errors}
                            setErrors={setErrors}
                        />
                        <GridInputBox
                            label={"연락처"}
                            id={"phoneNumber"}
                            type={"text"}
                            placeholder={"연락처를 입력해주세요. (숫자만 입력) "}
                            context={context}
                            isModifiable={true}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </div>
                </div>
                <div className='font-body '>
                    <div className='text-lg font-medium mb-1'>
                        <h4>2. 시공건물정보<small className="text-red-500">(필수*)</small></h4>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-4 mb-2 lg:space-y-0 space-y-2'>
                        <GridSelectBox
                            isLabel={true}
                            label={"유형"}
                            id={"buildingType"}
                            options={[{ value: "APARTMENT", content: "아파트" }, { value: "SMALL_APARTMENT", content: "빌라" }, { value: "HOUSE", content: "주택" }, { value: "COMMERCIAL", content: "상가" }]}
                            placeholder={"선택"}
                            context={context}
                            isModifiable={true}
                            errors={errors}
                            setErrors={setErrors}
                        />
                        <GridInputBox
                            label={"면적"}
                            id={"exclusiveArea"}
                            type={"number"}
                            placeholder={"분양 면적을 입력해주세요 - 단위: 평"}
                            context={context}
                            isModifiable={true}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </div>

                    {/* 주소 검색 */}
                    <AddressBox context={context} isModifiable={true} errors={errors} setErrors={setErrors} />
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
                            isModifiable={true}
                            errors={errors}
                            setErrors={setErrors}
                        />
                        <GridSelectBox
                            isLabel={true}
                            label={"공사범위"}
                            id={"interiorType"}
                            placeholder={"선택"}
                            options={[{ value: "PART", content: "부분시공" }, { value: "ALL", content: "전체시공" }]}
                            context={context}
                            isModifiable={true}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </div>
                    <div className='space-y-2'>
                        <div className='border border-gray-500 bg-gray-50 rounded-md p-2'>
                            <p className='text-sm lg:text-base mb-1'>전체시공</p>
                            <p className='text-xs lg:text-sm'>철거공사, 목공사, 타일공사,욕실공사, 필름공사, 도배공사, 페인트공사, 마루공사, 조명공사를 포함한 전체 리모델링 공사를 뜻합니다.</p>
                        </div>
                        <div className='border border-gray-500 bg-gray-50 rounded-md p-2'>
                            <p className='text-sm lg:text-base mb-1'>부분시공</p>
                            <p className='text-xs lg:text-sm'>전체 인테리어 마감재를 새것으로 교체하는 것이 아닌 선택적 마감재 재사용과 리폼을 포함한 부분적 리모델링 공사 입니다.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-lg font-medium mb-1 space-y-4'>
                        <h4>4. 참고사항</h4>
                        {/**메모기입란 */}
                        <div className='w-full'>
                            <textarea
                                id={"customerMemo"}
                                name={"customerMemo"}
                                value={customerMemo}
                                onChange={(e) => setCustomerMemo(e.target.value)}
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-sm lg:text-base placeholder:text-xs lg:placeholder:text-sm`}
                                placeholder={"기타 참고 사항이 있으면 적어주세요."}
                                rows={5}
                            />
                        </div>
                        <ReferenceForm context={context} />

                    </div>
                </div>
                <PersonalInformationForm errors={errors} setErrors={setErrors} />
                <div className='flex justify-center'>
                    <button
                        onClick={handleSubmit}
                        className='text-sm md:text-base font-body bg-black hover:opacity-75 text-white px-6 py-2 rounded-md'
                        disabled={isFetchingModalOpen}
                    >
                        {isAuthenticated ? "등록" : "견적문의하기"}
                    </button>
                </div>
            </form>

            {isFetchingModalOpen &&
                <FetchingModal />
            }

            {isResultModalOpen &&
                <ResultModal title={"접수 완료"} content={"문의가 성공적으로 접수 되었습니다."} callbackFn={() => { navigate({ pathname: "../" }) }} />
            }

            {isWarningModalOpen &&
                <ResultModal title={"경고"} content={"필수 입력사항을 모두 입력해주세요."} callbackFn={() => setIsWarningModalOpen(false)} />
            }
        </div>
    )
}

export default ContactAddForm