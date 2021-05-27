import React, { useCallback, useState, useEffect } from "react";
import { Switch, Route, useHistory, BrowserRouter } from "react-router-dom";
import Button from "../common/Button";
import CalendarData from "./CalendarData";
import CalendarInputForm from "./CalendarInputForm";

const CalendarFrame = () => {
    const history = useHistory();
    // history.push("/calendar/" + newDate);

    const [allEvents, setAllEvents] = useState([]),
        [isShow, setIsShow] = useState(false),
        [start, setStart] = useState(""),
        [title, setTitle] = useState("");

    const basicRecipes = [
        { id: 1, name: "オムライス" },
        { id: 2, name: "肉じゃが" },
        { id: 3, name: "ハンバーグ" },
        { id: 4, name: "ナポリタン" },
    ];

    const targetDates = ["2021-05-20", "2021-05-21"];

    const addNewRecipeSchedule = (mode) => {
        const newRecipeSchedule = [];
        // 自動登録の場合
        if (mode == "automatic") {
            targetDates.forEach((start, index) => {
                const temp = {
                    start,
                    title: basicRecipes[index].name,
                    user_id: 1, // memo)後で動的にとれるように修正する
                };
                newRecipeSchedule.push(temp);
                console.log(newRecipeSchedule);
            });
        } else {
            const temp = {
                start: start,
                title: title,
                user_id: 1, // memo)後で動的にとれるように修正する
            };
            newRecipeSchedule.push(temp);
        }
        axios
            .post("/api/calendar", newRecipeSchedule)
            .then((res) => {
                console.log(res.data);
                fetchAllRecipeSchedules();
                setIsShow(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const inputTitle = useCallback(
        (event) => {
            setTitle(event.target.value);
        },
        [setTitle]
    );

    //  -> 2020-01-05
    const convertDateFormat = useCallback((eventData) => {
        const dt = eventData.event.start;
        const y = dt.getFullYear();
        const m = ("00" + (dt.getMonth() + 1)).slice(-2);
        const d = ("00" + dt.getDate()).slice(-2);
        const convertedDate = y + "-" + m + "-" + d;
        return convertedDate;
    }, []);

    const displayEvent = (eventData) => {
        // フォームに日付とイベントタイトルをセット
        setStart(convertDateFormat(eventData));
        setTitle(eventData.event.title);
        setIsShow(true);
    };

    const fetchAllRecipeSchedules = () => {
        axios
            .get("/api/calendar")
            .then((res) => {
                setAllEvents(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchAllRecipeSchedules();
    }, []);

    return (
        <>
            {/* モーダルが開いている状態 */}
            {isShow ? (
                <CalendarInputForm
                    addNewRecipeSchedule={addNewRecipeSchedule}
                    inputTitle={inputTitle}
                    setIsShow={() => setIsShow()}
                    setTitle={setTitle}
                    start={start}
                    title={title}
                />
            ) : (
                <>
                    <Button
                        className=""
                        name="スケジュール一括登録"
                        onClick={() => addNewRecipeSchedule("automatic")}
                    />
                    <CalendarData
                        allEvents={allEvents}
                        clickEvent={displayEvent}
                    />
                </>
            )}
        </>
    );
};
export default CalendarFrame;
