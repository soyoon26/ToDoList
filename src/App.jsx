import { useRef, useState, useReducer } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import Footer from "./components/Footer";
import todoLogo from "./assets/todoLogo.png";
const testData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    heart: "🖤🖤🖤🖤🤍",
    date: "2024.05.19",
  },
  {
    id: 1,
    isDone: false,
    content: "달리기하기",
    heart: "🖤🖤🤍🤍🤍",
    date: "2024.05.20",
  },
  {
    id: 2,
    isDone: false,
    content: "강아지 산책 시키기",
    heart: "🖤🖤🖤🖤🖤",
    date: new Date().getTime(),
  },
];
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      console.log(action.targetID);
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

  const onCreate = (content, heart) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        heart: heart,
        date: new Date().getTime(),
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
      <img className="mt-10 mb-10 w-1/3" src={todoLogo} />
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
