import React, { useState, useEffect, useRef, useContext } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { ko } from "date-fns/locale";

const DatePicker = ({ label, id, context }) => {
    const { formData, setFormData } = useContext(context);
    const [selectedDate, setSelectedDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    const handleDateClick = (date) => {
        setSelectedDate(format(date, "yyyy년 MM월 dd일", { locale: ko }));
        setShowCalendar(false);
        setFormData(prev => ({ ...prev, [id]: format(date, "yyyy-MM-dd") }));
    };

    const handleReset = (e) => {
        e.preventDefault();
        setShowCalendar(false);
        setFormData(prev => ({ ...prev, [id]: "" }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={calendarRef}>
            <label htmlFor="name" className="block text-sm lg:text-base font-semibold text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type="text"
                readOnly
                value={formData[id]}
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full p-1 border-b border-gray-300 focus:border-gray-500 text-sm lg:text-base focus:outline-none placeholder:text-sm lg:placeholder:text-base"
                placeholder="날짜를 선택하세요."
            />
            {showCalendar && (
                <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-md p-4 z-50">
                    <Calendar onDateSelect={handleDateClick} />
                    <button
                        className="mt-2 w-full px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400"
                        onClick={handleReset}
                    >
                        초기화
                    </button>
                </div>
            )}
        </div>
    );
};

const Calendar = ({ onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const firstDayIndex = getDay(start);

    return (
        <div>
            <div className="flex justify-between mb-2">
                <button
                    className="px-2 py-1 border rounded"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
                    }}
                >
                    {"<"}
                </button>
                <span className="font-semibold">{format(currentMonth, "yyyy년 MM월", { locale: ko })}</span>
                <button
                    className="px-2 py-1 border rounded"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
                    }}
                >
                    {">"}
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <div key={day} className="text-center font-semibold">
                        {day}
                    </div>
                ))}
                {Array.from({ length: firstDayIndex }).map((_, index) => (
                    <div key={`empty-${index}`} className="p-2"></div>
                ))}
                {days.map((date) => (
                    <button
                        key={date}
                        className="p-2 text-center border rounded hover:bg-gray-200"
                        onClick={() => onDateSelect(date)}
                    >
                        {format(date, "d")}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DatePicker;
