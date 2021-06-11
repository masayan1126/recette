import React, { useCallback, useState, useEffect } from "react";
const Button = (props) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
            onClick={() => props.onClick(props.argument)}
        >
            {props.name}
        </button>
    );
};
export default Button;
