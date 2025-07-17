import OrderButton from "./OrderButton";

export default function Title({
  count,
  location,
  guests,
  onReset,
  onOrderChange,
  currentOrder,
}) {
  const showReset = location || guests > 0;
  const locationName = location ? location : "The world";

  return (
    <div className="dark:bg-slate-900 dark:text-[#d1afff]">
      <div className="hidden md:flex justify-between items-center py-4 px-16">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-bold">Stays in {locationName}</h1>
          {guests > 0 && (
            <p className="flex items-center text-gray-500 dark:text-gray-400">
              {guests} guest{guests > 1 ? "s" : ""}
            </p>
          )}
          {showReset && (
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-lg text-white bg-red-400 hover:bg-red-600 dark:bg-violet-800 dark:hover:bg-violet-950 transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
        <div className="flex gap-8 justify-center items-center">
          <OrderButton
            onOrderChange={onOrderChange}
            currentOrder={currentOrder}
          />

          <p className="font-semibold text-gray-600 dark:text-gray-400">
            {count > 12 ? "12+" : count} stay{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-4 md:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Stays in {locationName}</h1>
          <p className="font-semibold text-gray-600 dark:text-gray-400">
            {count > 12 ? "12+" : count} stay{count !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex justify-between items-center">
          {guests > 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              {guests} guest{guests > 1 ? "s" : ""}
            </p>
          )}
          <div className="flex w-full justify-end gap-2">
            {showReset && (
              <button
                onClick={onReset}
                className="px-4 py-2 rounded-lg text-white bg-red-400 dark:bg-violet-800 dark:hover:bg-violet-950 hover:bg-red-600 transition-colors"
              >
                Reset filters
              </button>
            )}
            <div></div>
            <OrderButton
              onOrderChange={onOrderChange}
              currentOrder={currentOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
