export const CounterSection = ({
  title,
  description,
  value,
  onDecrease,
  onIncrease,
}) => (
  <div className="mb-6">
    <p className="font-bold">{title}</p>
    <p className="text-gray-400">{description}</p>
    <div className="flex w-[120px] items-center justify-between mt-2">
      <CounterButton onClick={onDecrease}>-</CounterButton>
      <span>{value}</span>
      <CounterButton onClick={onIncrease}>+</CounterButton>
    </div>
  </div>
);

export const CounterButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-5 h-5 border rounded hover:shadow-[0_0_10px_rgb(197,78,78)] hover:w-6 hover:h-6 active:bg-[#c54e4e] active:w-5 active:h-5"
  >
    {children}
  </button>
);
