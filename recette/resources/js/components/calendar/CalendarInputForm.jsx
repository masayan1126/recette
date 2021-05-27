import React, { useCallback, useState, useEffect } from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import axios from "axios";

const CalendarInputForm = (props) => {
    return (
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
            <div className="bg-white rounded-lg w-1/2">
                <div className="flex flex-col items-start p-4">
                    {
                        <div>
                            <div className="flex items-center w-full">
                                <div className="text-gray-900 font-medium text-lg">
                                    <p>{props.start}</p>
                                </div>
                            </div>
                            晩ごはん:
                            <TextInput
                                className=""
                                onChange={props.inputTitle}
                                required={true}
                                type={"text"}
                                value={props.title}
                            />
                        </div>
                    }

                    <div className="ml-auto">
                        <Button
                            className=""
                            name="登録する"
                            onClick={() => props.addNewRecipeSchedule()}
                        />
                        <Button
                            className=""
                            name="閉じる"
                            onClick={() => props.setIsShow(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CalendarInputForm;
