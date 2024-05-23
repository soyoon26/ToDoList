import { useState } from "react";

const TodoItem = ({
  id,
  isDone,
  content,
  heart,
  image,
  date,
  onUpdate,
  onDelete,
  todos,
}) => {
  const [line, setLine] = useState(false);
  const onChangeCheckBox = () => {
    onUpdate(id);
    setLine(!line);
    id += 100;
  };
  const onClickDeleteButton = () => {
    onDelete(id);
  };
  return (
    <div className="flex w-full mt-5 mb-5 p-4 bg-white rounded">
      <div className="flex">
        <input
          className="ml-2"
          onChange={onChangeCheckBox}
          checked={isDone}
          type="checkbox"
        />
        <img src={image} style={{ maxWidth: "100%", maxHeight: "200px" }}></img>
      </div>
      <div className="ml-10 pt-2">
        <div
          className={`mt-4 ml-2 text-2xl font-semibold ${
            line ? "line-through" : ""
          }`}
        >
          {content}
        </div>
        <div className=" text-gray-500">중요도: {heart}</div>
        <div className="date mb-3 text-gray-500">
          추가일: {new Date(date).toLocaleDateString()}
        </div>
      </div>
      <button
        className="bg-black ml-auto w-20 text-white rounded shadow-md p-1"
        onClick={onClickDeleteButton}
      >
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
