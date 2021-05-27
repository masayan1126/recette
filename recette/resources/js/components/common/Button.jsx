import React, { useCallback, useState, useEffect } from "react";
const Button = (props) => {
    return (
        <button className={props.className} onClick={() => props.onClick()}>
            {props.name}
        </button>
    );
};
export default Button;
