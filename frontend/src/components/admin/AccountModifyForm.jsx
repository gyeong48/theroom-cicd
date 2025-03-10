import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GridInputBox from '../common/GridInputBox';
import { AccountContext } from '../../context/AccountProvider';
import { validate } from '../../util/validator';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';
import { modifyAccount } from '../../api/accountApi';
import useCustomMove from '../../hooks/useCustomMove';

function AccountModifyForm() {
    const navigate = useNavigate();
    const context = AccountContext
    const { moveToAdminError } = useCustomMove();
    const { formData, setFormData } = useContext(context)
    const [isModifiable, setIsModifiable] = useState(false);
    const [isFetchingModalOpen, setIsFetchingModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordCheck: "",
    });

    const checkError = () => {
        const newErrors = Object.keys(errors).reduce((acc, key) => {
            const error = validate(key, formData[key]);

            if (error) acc[key] = error;
            return acc;
        }, {})

        if (formData.newPassword !== formData.newPasswordCheck) {
            newErrors.newPasswordCheck = validate("newPasswordCheck", false)
        }

        setErrors(newErrors)

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

        modifyAccount(formData)
            .then(res => {
                setIsModifiable(false);
                setIsFetchingModalOpen(false);
                navigate({ pathname: "../" })
            })
            .catch(err => {
                console.log(err);
                moveToAdminError();
            })

        setIsFetchingModalOpen(true);
    }

    const handleModify = () => {
        setIsModifiable(true);
    }

    const handleCancel = () => {
        setIsModifiable(false);
    }

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-8 p-6 mt-6">
            <form className="pt-10 space-y-14 bg-white p-6">
                <GridInputBox
                    label={"아이디"}
                    id={"username"}
                    type={"text"}
                    placeholder={"제목을 입력해주세요."}
                    context={context}
                    isModifiable={false}
                    errors={null}
                    setErrors={null}
                />
                <GridInputBox
                    label={"현재 비밀번호"}
                    id={"currentPassword"}
                    type={"password"}
                    placeholder={"현재 비밀번호를 입력해주세요."}
                    context={context}
                    isModifiable={isModifiable}
                    errors={errors}
                    setErrors={setErrors}
                />
                <GridInputBox
                    label={"변경할 비밀번호"}
                    id={"newPassword"}
                    type={"password"}
                    placeholder={"변경할 비밀번호를 입력해주세요."}
                    context={context}
                    isModifiable={isModifiable}
                    errors={errors}
                    setErrors={setErrors}
                />
                <GridInputBox
                    label={"변경할 비밀번호 확인"}
                    id={"newPasswordCheck"}
                    type={"password"}
                    placeholder={"변경할 비밀번호를 한번 더 입력해주세요."}
                    context={context}
                    isModifiable={isModifiable}
                    errors={errors}
                    setErrors={setErrors}
                />
                <div className='flex justify-center items-center'>
                    {isModifiable ?
                        <div className='flex justify-center space-x-6'>
                            <button
                                onClick={handleSubmit}
                                className='text-xs px-4 py-2 lg:text-base lg:px-6 lg:py-2 font-body bg-green-400 hover:opacity-75 text-white rounded-md'
                            >
                                저장
                            </button>
                            <button
                                onClick={handleCancel}
                                className='text-xs px-4 py-2 lg:text-base lg:px-6 lg:py-2 font-body bg-red-400 hover:opacity-75 text-white rounded-md'
                            >
                                취소
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
            </form>

            {isFetchingModalOpen &&
                <FetchingModal />
            }


            {isWarningModalOpen &&
                <ResultModal title={"경고"} content={"필수 입력사항을 모두 입력해주세요."} callbackFn={() => setIsWarningModalOpen(false)} />
            }
        </div>
    )
}

export default AccountModifyForm