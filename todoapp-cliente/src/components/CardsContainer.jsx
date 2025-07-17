import Card from "./Card";

export default function CardsContainer({ stays }) {
  if (stays.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-500">
          No stays found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-8 p-4 md:px-16">
      {stays.map((stay, index) => (
        <Card
          key={index}
          city={stay.city}
          country={stay.country}
          superHost={stay.superHost}
          title={stay.title}
          rating={stay.rating}
          type={stay.type}
          beds={stay.beds}
          photo={stay.photo}
        />
      ))}
    </div>
  );
}
