import React, { useCallback, useState, useEffect } from "react";
const TextInput = (props) => {
    return (
        <input
            className={props.className}
            onChange={props.onChange}
            required={props.required}
            type={props.type}
            value={props.value}
            // fullWidth={props.fullWidth}
            // label={props.label}
            // margin="dense"
            // multiline={props.multiline}
            // rows={props.rows}
        />
    );
};
export default TextInput;
