import { useRef, useState } from "react";
import Button from "./Button";
const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const [heart, setHeart] = useState("");

  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };
  const onSubmit = () => {
    if (content === "") {
      inputRef.current.focus();
      return; //비어있으면 입력란에 포커스
    }
    onCreate(content, heart);
    setContent("");
    setHeart("");
  };

  const handleChange = (event) => {
    setHeart(event.target.value);
  };
  return (
    <div className="flex p-5 w-4/5">
      <input
        className="w-full h-12 rounded shadow-md p-1"
        ref={inputRef}
        value={content}
        placeholder="  새로운 할 일을 입력해보세요!"
        onChange={onChangeContent}
        onKeyDown={onKeydown}
      ></input>

      <select
        id="options"
        className="p-2 ml-1 border border-gray-300 rounded"
        value={heart}
        onChange={handleChange}
      >
        <option value="" disabled>
          중요도를 선택하세요
        </option>
        <option value="🖤🤍🤍🤍🤍">🖤🤍🤍🤍🤍</option>
        <option value="🖤🖤🤍🤍🤍">🖤🖤🤍🤍🤍</option>
        <option value="🖤🖤🖤🤍🤍">🖤🖤🖤🤍🤍</option>
        <option value="🖤🖤🖤🖤🤍">🖤🖤🖤🖤🤍</option>
        <option value="🖤🖤🖤🖤🖤">🖤🖤🖤🖤🖤</option>
      </select>

      <Button onClick={onSubmit} />
    </div>
  );
};
export default Editor;
