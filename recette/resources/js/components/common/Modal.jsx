import React, { useCallback, useState, useEffect } from "react";
import TextInput from "./TextInput";
import Button from "./Button";

const Modal = (props) => {
    return (
        <div className="overlay">
            <div className="content">
                晩ごはん:
                <TextInput />
                <Button />
                <Button />
            </div>
        </div>
    );
};
export default Modal;
