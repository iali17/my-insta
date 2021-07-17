import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';


function AutoSizedTextArea(props: {onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void, onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void, submit?: string,
    placeholder?: string | null | undefined }) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [text, setText] = useState("");
	const [textAreaHeight, setTextAreaHeight] = useState("auto");
	const [parentHeight, setParentHeight] = useState("auto");
    const placeholder = props.placeholder || "Add a comment..."

    useEffect(() => {
            setParentHeight(`${textAreaRef.current?.scrollHeight }px`);
            setTextAreaHeight(`${textAreaRef.current?.scrollHeight! + 2 }px`);
	}, [text]);

	const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value === "") {
            setTextAreaHeight("30px");
        }

        if (textAreaRef.current) {
            setParentHeight(`${textAreaRef.current.scrollHeight }px`);
        }
		setText(event.target.value);

		if (props.onChange) {
			props.onChange(event);
		}
	};

    const submitButton = () => {
        if (props.submit) {
            return <button className="btn btn-outline-light col-2" type="submit">{props.submit}</button>
        }
    }

    return(
        <div style={{ minHeight: parentHeight }} className="row">
            <textarea
                {...props}
                className="form-control text-white bg-dark shadow-none col"
                ref={textAreaRef}
                rows={1}
                placeholder={placeholder}
                style={{
					height: textAreaHeight,
                    resize: 'none',
				}}
				onChange={onChangeHandler}
            />
            {submitButton()}
        </div>
    );
}

export default AutoSizedTextArea;