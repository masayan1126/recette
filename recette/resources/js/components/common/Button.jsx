import { useCallback, useState, useEffect } from "react";
import styled from "styled-components";

const PrimaryButton = styled.button({
    backgroundColor: "blue",
    border: "none",
    padding: "4px 14px",
});

const Button = (props) => {
    return (
        <PrimaryButton
            className={props.button}
            // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => props.onClick(props.argument)}
        >
            {props.name}
        </PrimaryButton>
    );
};
export default Button;
