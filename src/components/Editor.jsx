import { useRef, useState } from "react";
import Button from "./Button";
import potato from "../assets/potato.png";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const [heart, setHeart] = useState("없음");
  const [image, setImage] = useState(potato);
  const inputRef = useRef();
  const [deadline, setDeadline] = useState("기간");
  const [dday, setDday] = useState();
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

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const onSubmit = () => {
    if (content === "") {
      inputRef.current.focus();
      return; //비어있으면 입력란에 포커스
    }
    onCreate(content, heart, deadline, image, dday);
    setContent("");
    setHeart("");
    setImage(potato);
    setDeadline("기간");
    setDday("");
  };

  const handleChange = (event) => {
    setHeart(event.target.value);
  };
  const handle = (event) => {
    const date = moment(event).format("YYYY년 MM월 DD일");
    const days = event.getTime() - new Date().getTime();
    setDeadline(date);
    setDday(Math.ceil(days / (1000 * 3600 * 24)));
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
      <Dropdown className="ml-2 mt-1" onClick={handleToggle}>
        <Dropdown.Toggle className="bg-red-400 border-bgColor">
          {deadline}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Calendar
            className="font-['cinema']"
            onChange={handle}
            formatDay={(locale, date) => moment(date).format("DD")}
          />
        </Dropdown.Menu>
      </Dropdown>

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
