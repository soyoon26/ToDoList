const Button = ({ onClick }) => {
  const onClickButtion = (e) => {
    onClick();
  };

  return (
    <button
      className="ml-5 p-1 w-1/6 h-12 bg-red-400 rounded-full shadow-md"
      onClick={onClickButtion}
    >
      추가
    </button>
  );
};

export default Button;
