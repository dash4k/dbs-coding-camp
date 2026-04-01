import React from "react";

function useInput(defaultValue = '') {
    const [value, setValue] = React.useState(defaultValue);

    const onValueChangeHandler = (e) => {
        setValue(e.target.value);
    }

    return [value, onValueChangeHandler];
}

export default useInput;
