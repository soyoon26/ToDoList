import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useMemo } from "react";
const List = ({ todos, onUpdate, onDelete }) => {
  console.log(todos);
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(timer);
      }; //value 변경 시점에 clearTimeout
    }, [value]);
    return debouncedValue;
  };
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const timesearch = useDebounce(search, 200);
  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(timesearch.toLowerCase())
    );
  };

  const filterdTodos = getFilteredData();
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  }, [todos]); // 빈배열은 변화되어도 바뀌지 않음, 연산최적화

  return (
    <div className="mb-10 flex justify-centers w-4/5">
      <div className="flex-col items-center w-full ">
        <div className="m-5 text-m text-bold text-red-500">
          <div>Total : {totalCount}</div>
          <div>Done : {doneCount}</div>
          <div>notDone : {notDoneCount}</div>
        </div>
        <input
          className="h-12 w-full rounded-l mb-10"
          value={search}
          onChange={onChangeSearch}
          placeholder="  검색어를 입력하세요."
        ></input>
        <div className="w-full mt-1 h-px bg-stone-700"></div>
        <div>
          {filterdTodos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                {...todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                todos={todos}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default List;
