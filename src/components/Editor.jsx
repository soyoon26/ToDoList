import { useRef, useState } from "react";
import Button from "./Button";
import potato from "../assets/potato.png";
const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const [heart, setHeart] = useState("없음");
  const [image, setImage] = useState(potato);
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // 첫 번째 파일 선택
    const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성

    reader.onload = () => {
      // 파일을 읽은 후 실행할 작업
      setImage(reader.result); // 이미지를 상태에 저장하여 화면에 표시
    };

    // 파일을 읽기 시작
    reader.readAsDataURL(selectedFile);
    console.log(image);
  };
  const onSubmit = () => {
    if (content === "") {
      inputRef.current.focus();
      return; //비어있으면 입력란에 포커스
    }
    onCreate(content, heart, image);
    setContent("");
    setHeart("");
    setImage("");
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
      <input
        className="h-12 w-1/3 p-2"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <select
        id="options"
        className="p-2 ml-1 border border-gray-300 rounded"
        value={heart}
        onChange={handleChange}
      >
        <option value="">중요도를 선택하세요</option>
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
