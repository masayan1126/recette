import Button from "../common/Button";
import CalendarData from "./CalendarData";
import CalendarInputForm from "./CalendarInputForm";
import { getUserId } from "../../reducks/users/selectors";
import { getRecipeSchedules } from "../../reducks/recipeSchedules/selectors";
import { push } from "connected-react-router";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { signOut } from "../../reducks/users/operations";
import {
    saveRecipeSchedule,
    fetchAllRecipeSchedule,
    updateRecipeSchedule,
    deleteRecipeSchedule,
} from "../../reducks/recipeSchedules/operations";
import { useDispatch, useSelector } from "react-redux";
import {
    showLoadingAction,
    hideLoadingAction,
} from "../../reducks/loading/actions";

const CalendarFrame = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);
    const recipeSchedules = getRecipeSchedules(selector);
    const calendarId = window.location.pathname.split("/calendar/")[1];

    // const generateRandomString = (wordCount) => {
    //     // 0 以上 1 未満のランダムな浮動小数点数を作成し、小数点以下の数値を36進数にする（0-9a-zの36文字で表現）。最後に後ろから指定した文字数を切り取る
    //     const randomString = Math.random().toString(36).slice(-wordCount);
    //     return randomString;
    // };

    const [isOpen, setIsOpen] = useState(false),
        [recipeName, setRecipeName] = useState(""),
        [eventId, setEventId] = useState(0),
        [startDate, setStartDate] = useState(""),
        [endDate, setEndDate] = useState("");

    const basicRecipes = [
        { id: 1, name: "オムライス" },
        { id: 2, name: "肉じゃが" },
        { id: 3, name: "ハンバーグ" },
        { id: 4, name: "ナポリタン" },
        { id: 5, name: "焼きそば" },
        { id: 6, name: "炊き込みご飯" },
        { id: 7, name: "水炊き" },
        { id: 8, name: "カレー" },
        { id: 9, name: "唐揚げ" },
        { id: 10, name: "餃子" },
    ];

    // 登録済みのスケジュールをクリックした時のイベントリスナー
    const clickEvent = useCallback((eventClickInfo) => {
        dispatch(
            push("/calendar/" + eventClickInfo.event.startStr.replace(/-/g, ""))
        );
        // フォームに日付とイベントタイトルをセット
        setStartDate(eventClickInfo.event.startStr);
        setRecipeName(eventClickInfo.event.title);
        setEventId(eventClickInfo.event.id);
        setIsOpen(true);
    }, []);

    // イベントを移動した時のリスナー
    const moveEvent = useCallback(
        (eventDropInfo) => {
            const event = {
                id: eventDropInfo.event.id,
                title: eventDropInfo.event.title,
                start: eventDropInfo.event.startStr,
                user_id: userId,
            };
            dispatch(updateRecipeSchedule(event));
        },
        [convertDateFormat, updateRecipeSchedule]
    );

    // 日付選択時(1日・複数ドラッグ選択)
    const _selectDate = (selectionInfo) => {
        setStartDate(selectionInfo.startStr);
        // 終了日は、選択した日付の最終日＋1日の日付が取得できてしまう(排他的)ため、1日マイナスする処理を実施
        let _endDate = selectionInfo.end;
        _endDate.setDate(_endDate.getDate() - 1);
        _endDate = convertDateFormat(_endDate);
        setEndDate(_endDate);
        // 選択した日付の開始日と終了日が同日ならモーダルを開く
        selectionInfo.startStr == _endDate ? setIsOpen(true) : "";
    };

    const selectDate = useCallback(
        (selectionInfo) => {
            _selectDate(selectionInfo);
        },
        [startDate, endDate]
    );

    // // イベント移動・編集
    // const editRecipeSchedule = (event) => {
    //     // 移動でなく、単純な編集の場合
    //     // if (calendarId) {
    //     //     event.id = eventId;
    //     // }
    // };

    // フォームで閉じるボタンを推した時の初期化処理
    const _initCalendarInputForm = () => {
        setIsOpen(false);
        setRecipeName("");
        dispatch(push("/calendar"));
    };

    const initCalendarInputForm = useCallback(() => {
        _initCalendarInputForm();
    }, []);

    const inputRecipeName = useCallback(
        (event) => {
            setRecipeName(event.target.value);
        },
        [setRecipeName]
    );

    // Fri Apr 02 2021 00:00:00 GMT+0900 (日本標準時) -> 2021-04-02
    // eventData.event.start.toISOString().split("T")とすれば日付だけ容易に切り出せるが、UTC基準となるため、使用できないためこのように記載
    const convertDateFormat = (dateObj) => {
        return (
            dateObj.getFullYear() +
            "-" +
            ("0" + (dateObj.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + dateObj.getDate()).slice(-2)
        );
    };

    // 一括登録する日付の範囲を配列で生成
    const dateArrayForAutomaticRegistration = useMemo(() => {
        const targetDateRange = [];
        // 開始日が終了日以下になるまで開始日に1日ずつ足していく
        for (
            let d = new Date(startDate);
            d <= new Date(endDate);
            d.setDate(d.getDate() + 1)
        ) {
            // 月・日ともに0詰めしてsliceで切り取る(切り取る際、負のインデックスなので、右から-1、-2...と数える)ことで1桁の際に0詰めできるよう処理
            const formatedDate =
                d.getFullYear() +
                "-" +
                ("0" + (d.getMonth() + 1)).slice(-2) + // TODO():-2の部分は変数に置き換えたい
                "-" +
                ("0" + d.getDate()).slice(-2);

            targetDateRange.push(formatedDate);
        }
        return targetDateRange;
    }, [startDate, endDate]);

    const generateNewEvent = (mode) => {
        const event = {
            start: startDate,
            title: recipeName,
            user_id: userId,
        };

        // 編集の場合はeventにidを追加する
        if (calendarId) {
            event.id = eventId;
            return event;
        }

        const tempList = [];
        // 自動登録の場合
        if (mode == "automatic") {
            dateArrayForAutomaticRegistration.forEach((start, index) => {
                const temp = {
                    start,
                    title: basicRecipes[index].name,
                    user_id: userId, // memo)後で動的にとれるように修正する
                };
                tempList.push(temp);
            });
        } else {
            tempList.push(event);
        }
        return tempList;
    };

    // propsで渡しているが、依存関係のない処理なので、第二引数に空の配列をセット(初回レンダリング時のみ関数を生成)
    // たとえ依存関係がない関数でも、子コンポーネントに渡すときに違う参照の関数を渡すことになり、子コンポーネントから見れば毎回違うセットのpropsが渡ってくるように見える為
    // useState由来の関数の場合は、Reactで同一性が保証されているためdepsに含めなくても問題ない

    const _sendNewRecipeSchedule = (mode) => {
        const newEvent = generateNewEvent(mode);

        setIsOpen(false);
        dispatch(push("/calendar"));
        dispatch(showLoadingAction());
        calendarId
            ? dispatch(updateRecipeSchedule(newEvent))
            : dispatch(saveRecipeSchedule(newEvent, mode));
        setTimeout(() => {
            dispatch(hideLoadingAction());
        }, 2000);
    };

    const sendNewRecipeSchedule = useCallback(
        (mode) => {
            _sendNewRecipeSchedule(mode);
        },
        [recipeName, startDate, endDate]
    );

    console.log(recipeSchedules);

    useEffect(() => {
        dispatch(fetchAllRecipeSchedule());
        dispatch(push("/calendar"));
    }, []);

    return (
        <>
            {/* <Button
                name="ランダムな文字列を生成する"
                argument="" // 引数
                onClick={() => generateRandomString(8)}
            /> */}
            {/* モーダルが開いている状態 */}
            {isOpen ? (
                <CalendarInputForm
                    deleteRecipeSchedule={() =>
                        dispatch(deleteRecipeSchedule(eventId))
                    }
                    initCalendarInputForm={initCalendarInputForm}
                    inputRecipeName={inputRecipeName}
                    recipeName={recipeName}
                    startDate={startDate}
                    endDate={endDate}
                    sendNewRecipeSchedule={sendNewRecipeSchedule}
                />
            ) : (
                <>
                    <Button
                        name="レシピ一括登録"
                        argument="automatic" // 引数
                        onClick={sendNewRecipeSchedule}
                    />
                    <Button
                        name="サインアウト"
                        onClick={() => dispatch(signOut())}
                    />
                    <Button
                        name="全削除"
                        onClick={() => dispatch(deleteRecipeSchedule())}
                    />

                    <CalendarData
                        clickEvent={clickEvent}
                        moveEvent={moveEvent}
                        recipeSchedules={recipeSchedules}
                        selectDate={selectDate}
                    />
                </>
            )}
        </>
    );
};
export default CalendarFrame;
