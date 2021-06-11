import React, { useCallback, useState, useEffect } from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import axios from "axios";

const CalendarInputForm = (props) => {
    console.log(
        "CalendarInputForm(モーダル)コンポーネントがレンダーされました"
    );
    return (
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
            <div className="bg-white rounded-lg w-1/2">
                <div className="flex flex-col items-start p-4">
                    {
                        <div>
                            <div className="flex items-center w-full">
                                <div className="text-gray-900 font-medium text-lg">
                                    <p>{props.startDate}</p>
                                </div>
                            </div>
                            晩ごはん:
                            <TextInput
                                className=""
                                onChange={props.inputRecipeName}
                                required={true}
                                type={"text"}
                                value={props.recipeName}
                            />
                        </div>
                    }

                    <div className="ml-auto">
                        <Button
                            className=""
                            name="登録する"
                            onClick={() =>
                                props.sendNewRecipeSchedule("manual")
                            }
                        />
                        <Button
                            className=""
                            name="削除する"
                            onClick={(eventId) =>
                                props.deleteRecipeSchedule(eventId)
                            }
                        />
                        <Button
                            className=""
                            name="閉じる"
                            onClick={() => props.initCalendarInputForm()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CalendarInputForm;
