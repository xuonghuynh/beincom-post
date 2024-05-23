import { useState, useEffect } from "react";

type TimeUnits = {
    value: number;
    label: string;
};

const intervals: TimeUnits[] = [
    { value: 60, label: "m" },
    { value: 3600, label: "h" },
    { value: 86400, label: "d" },
    { value: 2592000, label: "w" },
];

function useTimeAgo(timestamp: Date) {
    const [timeDifference, setTimeDifference] = useState(""); // timeDifference is a state variable

    useEffect(() => {
        const updateTime = () => {
            const now = Date.now();
            const seconds = Math.floor((now - timestamp.getTime()) / 1000);

            let unit: "y" | string = "y"; // Default unit for large values (more than a week)

            for (const interval of intervals) {
                if (seconds < interval.value) {
                    unit = interval.label;
                    setTimeDifference(
                        Math.floor(seconds / interval.value) + unit
                    );
                    break;
                }
            }
        };

        const intervalId = setInterval(updateTime, 60000); // Update every minute

        // Cleanup function to clear the interval on unmount
        return () => clearInterval(intervalId);
    }, [timestamp]);

    return timeDifference;
}

export default useTimeAgo;
