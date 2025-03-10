import React, { useContext, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { validate } from "../../util/validator";

const AddressBox = ({ context, isModifiable, errors, setErrors, isEssential }) => {
    const { kakao } = window;
    const { formData, setFormData } = useContext(context);
    const [addressData, setAddressData] = useState({
        postCode: formData["postCode"],
        mainAddress: formData["mainAddress"],
        detailAddress: formData["detailAddress"],
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleComplete = (data) => {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
        } else {
            addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
            }

            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            if (extraAddr !== '') {
                extraAddr = ' (' + extraAddr + ')';
            }

            addr = addr + " " + extraAddr;
        }

        new kakao.maps.services.Geocoder().addressSearch(addr, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                setFormData(prev => ({ ...prev, latitude: result[0].y, longitude: result[0].x }));
            }
        });

        setIsOpen(false);
        setAddressData((prev) => ({ ...prev, postCode: data.zonecode }));
        setAddressData((prev) => ({ ...prev, mainAddress: addr }));
        setAddressData((prev) => ({ ...prev, detailAddress: "" }));
        setFormData(prev => ({ ...prev, postCode: data.zonecode, mainAddress: addr, detailAddress: "" }));
        if (setErrors !== null) setErrors((prevErrors) => ({ ...prevErrors, mainAddress: validate("mainAddress", addr) }));
        document.getElementById("detailAddress").focus();
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log("click");
        setIsOpen(prev => !prev);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData((prev) => ({ ...prev, [name]: value }));
        setFormData(prev => ({ ...prev, [name]: value }));
        if (setErrors !== null) setErrors((prevErrors) => ({ ...prevErrors, detailAddress: validate("detailAddress", e.target.value) }));
    }

    return (
        <div className="font-body">
            <label htmlFor="type" className="block text-sm lg:text-base font-semibold text-gray-700">
                주소{isEssential && <small>(필수*)</small>}
            </label>

            <div className={`${isOpen ? "block" : "hidden"} relative`}>
                <img
                    src="//t1.daumcdn.net/postcode/resource/images/close.png"
                    className="cursor-pointer absolute right-0 top-[-1px] z-[1055]"
                    onClick={() => setIsOpen(false)}
                    alt="접기 버튼"
                />
                <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} className="w-full h-full p-2" />
            </div>

            {/* 주소 검색 */}
            <div className="w-full flex flex-col-reverse sm:flex-row mt-1">
                <input
                    type="text"
                    id="mainAddress"
                    name="mainAddress"
                    value={addressData.mainAddress}
                    onChange={handleChange}
                    placeholder="주소를 검색하세요"
                    className="block sm:w-4/5 w-full p-1 border-b border-gray-300 focus:border-gray-500 text-sm lg:text-base placeholder:text-sm lg:placeholder:text-base"
                    readOnly
                />
                <div>
                </div>
                {!isOpen &&
                    <button
                        onClick={handleClick}
                        className="block sm:w-1/5 w-full px-4 py-1.5 sm:py-2 bg-black text-white text-sm lg:text-base"
                        disabled={!isModifiable}
                    >
                        주소검색
                    </button>
                }
            </div>

            {/* 상세 주소 입력 */}
            <div>
                <input
                    type="text"
                    id="detailAddress"
                    name="detailAddress"
                    value={addressData.detailAddress}
                    onChange={handleChange}
                    placeholder="상세 주소를 입력하세요"
                    className="block w-full p-1 mt-1 sm:mt-2 border-b border-gray-300 focus:border-gray-500 focus:outline-none text-sm lg:text-base placeholder:text-sm lg:placeholder:text-base"
                    readOnly={!isModifiable}
                />
            </div>
            {(errors?.mainAddress || errors?.detailAddress) && <small className="text-red-500">주소를 입력하세요.</small>}
        </div>
    );
};

export default AddressBox;
