import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useReducer } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import Footer from "./components/Footer";
import todoLogo from "./assets/todoLogo.png";
import doggy from "./assets/doggy.jpg";
import icecream from "./assets/icecream.jpg";
import phonecase from "./assets/case.jpg";
const testData = [
  {
    id: 0,
    isDone: false,
    content: "폰 케이스 사기(buy)",
    image: phonecase,
    heart: "🖤🖤🤍🤍🤍",

    date: "2024.05.19",
    deadline: "2024년 7월 18일",
    dday: "1226",
  },

  {
    id: 1,
    isDone: false,
    content: "강아지 산책시키기",
    image: doggy,
    heart: "🖤🖤🖤🖤🖤",
    date: new Date().getTime(),
    deadline: "2024년 5월 23일",
    dday: "0",
  },
  {
    id: 2,
    isDone: false,
    content: "아이스크림 먹기 Thx JH",
    image: icecream,
    heart: "🖤🖤🖤🖤🤍",
    date: "2024.05.20",
    deadline: "2024년 5월 23일",
    dday: "없음",
  },
];
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      console.log(state, "ss");
      const updatedItem = state.find((item) => item.id === action.targetID);
      const updatedstate = state.filter((item) => item.id !== action.targetID);
      updatedItem.isDone
        ? (state = [updatedItem, ...updatedstate])
        : (state = [...updatedstate, updatedItem]);
      return state.map((item) =>
        item.id === action.targetID ? { ...item, isDone: !item.isDone } : item
      );

    case "DELETE":
      return state.filter((todo) => todo.id !== action.targetID);
    default:
      state;
  }
}
function App() {
  const [todos, dispatch] = useReducer(reducer, testData);
  const idRef = useRef(3);

  const onCreate = (content, heart, deadline, image, dday) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        heart: heart,
        deadline: deadline,
        image: image,
        date: new Date().getTime(),
        dday: dday,
      },
    });
  };

  const onUpdate = (targetID) => {
    dispatch({ type: "UPDATE", targetID: targetID });
  };
  const onDelete = (targetID) => {
    dispatch({ type: "DELETE", targetID: targetID });
  };

  return (
    <div className="font-['cinema'] bg-bgColor h-full w-screen flex flex-col items-center ">
      <img
        aria-label="ToDoList로고"
        className="mt-10 mb-8 w-1/3"
        src={todoLogo}
        alt="ToDoList로고"
      />
      <div className="mb-4">I love you dude, Let it rip.</div>
      <div className="w-full h-px bg-black"></div>
      <div className="w-full mt-1 h-px bg-black"></div>
      <Header />
      <Editor onCreate={onCreate} />
      <div className="w-4/5 mt-1 h-px bg-stone-700"></div>
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
      <Footer />
    </div>
  );
}

export default App;
