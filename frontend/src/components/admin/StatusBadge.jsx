import React from "react";

const STATUS_STYLES = {
    "CONTACT": { title: "상담전", style: "bg-gray-300 text-white" },
    "MEET1": { title: "상담1", style: "bg-blue-200 text-white" },
    "MEET2": { title: "상담2", style: "bg-blue-400 text-white" },
    "MEET3": { title: "상담3", style: "bg-indigo-500 text-white" },
    "CONTRACT": { title: "계약완료", style: "bg-green-500 text-white" },
    "IN_PROGRESS": { title: "시공중", style: "bg-yellow-400 text-white" },
    "COMPLETE": { title: "시공완료", style: "bg-green-700 text-white" },
    "HOLD": { title: "보류", style: "bg-gray-600 text-white" },
    "ADMIN": { title: "관리자", style: "bg-gray-600 text-white" },
    "MANAGER": { title: "매니저", style: "bg-gray-600 text-white" },
    "USER": { title: "사용자", style: "bg-gray-600 text-white" },
};

const StatusBadge = ({ status }) => {
    return (
        <div className={`px-2 lg:px-3 py-1 w-20 rounded-md text-xs md:text-sm font-semibold ${STATUS_STYLES[status].style || "bg-gray-500 text-white"} flex items-center justify-center`}>
            {STATUS_STYLES[status].title}
        </div>
    );
};

export default StatusBadge;
