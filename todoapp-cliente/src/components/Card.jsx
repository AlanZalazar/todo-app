export default function Card({
  city,
  country,
  superHost,
  title,
  rating,
  maxGuests,
  type,
  beds,
  photo,
}) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_0_12px_rgba(0,0,0,0.1)] hover:shadow-red-400 dark:hover:shadow-purple-700 dark:bg-slate-900 dark:text-[#d1afff]">
      <img
        src={
          photo ||
          "https://i.blogs.es/7997eb/los-simpsons-wes-anderson/1366_2000.jpeg"
        }
        alt={title}
        className="w-full h-[250px] rounded-2xl object-cover"
      />
      <div className="p-2">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2 dark:text-[#d1afff]">
          <div className="flex gap-2 items-center flex-wrap">
            {superHost && (
              <span className="px-2 py-1 border border-gray-800 rounded-full text-xs font-bold text-gray-800 uppercase dark:text-[#d1afff]">
                Super Host
              </span>
            )}
            <span>
              {type}
              {beds !== null ? ` • ${beds} ${beds === 1 ? "bed" : "beds"}` : ""}
            </span>
          </div>
          <div className="ml-auto font-semibold">
            <span className="text-[18px] font-semibold text-[#c54e4e] dark:text-purple-700 px-1">
              ★
            </span>
            {rating}
          </div>
        </div>
        <h2 className="text-md font-medium text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-gray-400">
          {city}, {country}
        </p>
      </div>
    </div>
  );
}
