import { useContext, useState } from "react";

const STATUS = [
    { status: "CONTACT", title: "상담전" },
    { status: "MEET1", title: "상담1" },
    { status: "MEET2", title: "상담2" },
    { status: "MEET3", title: "상담3" },
    { status: "CONTRACT", title: "계약완료" },
    { status: "IN_PROGRESS", title: "시공중" },
    { status: "COMPLETE", title: "시공완료" },
    { status: "HOLD", title: "보류" },
]

export default function StatusToggleButton({ context, isModifiable }) {
    const { formData, setFormData } = useContext(context);
    const index = STATUS.findIndex((s) => s.status === formData.status)
    const [activeIndex, setActiveIndex] = useState(index);

    const toggleButton = (e, index) => {
        e.preventDefault();
        setActiveIndex(index === activeIndex ? null : index);
        setFormData(prev => ({ ...prev, status: STATUS[index].status }))
    };

    return (
        <div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                {STATUS.map((s, index) => (
                    <button
                        key={index}
                        onClick={(e) => toggleButton(e, index)}
                        className={`p-3 text-white font-semibold rounded-lg transition duration-300 ease-in-out text-[10px] lg:text-sm ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-400'}`}
                        disabled={!isModifiable}
                    >
                        {s.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
