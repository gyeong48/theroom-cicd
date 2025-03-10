import React, { useContext, useState } from 'react'
import { ContactAddContext } from '../../context/ContactAddProvider';
import { validate } from '../../util/validator';

const info = `
개인정보처리방침

더룸(이하 “회사”)은 고객의 개인정보를 보호하고, 관련 법령을 준수하기 위해 다음과 같은 개인정보처리방침을 수립·공개합니다.

1. 개인정보의 수집 및 이용 목적

회사는 다음 목적을 위해 개인정보를 수집·이용합니다.
	•	서비스 제공 및 계약 이행(인테리어 상담, 견적 제공, 시공 등)
	•	고객 문의 응대 및 불만 처리
	•	마케팅 및 광고 활용(이벤트 안내, 서비스 홍보 등)
	•	법적 의무 이행

2. 수집하는 개인정보 항목

회사는 다음과 같은 개인정보를 수집할 수 있습니다.
	•	필수 항목: 성명, 연락처(전화번호, 이메일), 주소
	•	선택 항목: 인테리어 희망 사항, 예산, 기타 상담 내용

3. 개인정보의 보유 및 이용 기간

회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 즉시 파기합니다. 단, 관련 법령에 따라 일정 기간 동안 보관이 필요한 경우에는 해당 기간 동안 보관 후 파기합니다.
	•	계약 또는 청약철회 등에 관한 기록: 5년(전자상거래법)
	•	소비자 불만 또는 분쟁처리에 관한 기록: 3년(전자상거래법)
	•	기타 관련 법령에 따른 보관 의무 기간 준수

4. 개인정보의 제3자 제공

회사는 원칙적으로 고객의 개인정보를 외부에 제공하지 않습니다. 다만, 고객의 동의가 있거나 관련 법령에 따라 요청이 있을 경우 예외적으로 제공될 수 있습니다.

5. 개인정보 처리의 위탁

회사는 원활한 서비스 제공을 위해 일부 업무를 외부 업체에 위탁할 수 있으며, 위탁 계약 시 개인정보 보호를 위한 조치를 시행합니다.

6. 개인정보의 파기 절차 및 방법
	•	전자적 파일 형태: 복구할 수 없도록 안전한 방법으로 삭제
	•	종이 문서: 분쇄하거나 소각하여 파기

7. 이용자의 권리 및 행사 방법

고객은 언제든지 개인정보 열람, 정정, 삭제 요청을 할 수 있으며, 회사는 이에 대해 신속하게 조치합니다.

8. 개인정보 보호책임자 및 문의처

개인정보 보호와 관련된 문의는 아래 연락처로 문의해 주세요.
	•	담당자: 이지환
	•	연락처: 010-9336-5804
	•	이메일: dlwlghks0330@naver.com

9. 개인정보처리방침 변경

회사는 법령 변경 또는 내부 방침에 따라 개인정보처리방침을 변경할 수 있으며, 변경 사항은 홈페이지 또는 블로그를 통해 공지합니다.

공고일: 2025년 02월 13일
시행일: 2025년 02월 13일
`

function PersonalInformationForm({ errors, setErrors }) {
    const [isAgreed, setIsAgreed] = useState(false);
    const { setFormData } = useContext(ContactAddContext);

    const handleCheckboxChange = (e) => {
        setIsAgreed(e.target.checked);
        setFormData(prev => ({ ...prev, personalInformationAgree: e.target.checked }))
        setErrors((prevErrors) => ({ ...prevErrors, personalInformationAgree: validate("personalInformationAgree", e.target.checked) }));
    };

    return (
        <div className='font-body mb-4'>
            <div className='text-lg font-medium mb-1'>
                <h4>5. 개인정보처리방침 동의<small className="text-red-500">(필수*)</small></h4>
            </div>
            <textarea
                readOnly
                rows="7"
                className="w-full p-2 border border-gray-300 rounded-md mb-1 focus:outline-none text-xs"
                value={info}
            />

            <div className="flex items-center">
                {/* 체크박스 */}
                <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={isAgreed}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                />
                <label htmlFor="agree" className="text-gray-700">
                    개인정보처리방침에 동의합니다.
                </label>
            </div>
            {errors && errors.hasOwnProperty("personalInformationAgree") && <small className="text-red-500">{errors["personalInformationAgree"]}</small>}
        </div>
    )
}

export default PersonalInformationForm