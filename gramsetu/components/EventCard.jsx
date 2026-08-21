function EventCard(props) {
  return (
    <div className="border rounded-xl p-5 shadow">
      <h2 className="text-xl font-bold">
        {props.title}
      </h2>

      <p className="text-gray-600 mt-2">
        📅 {props.date}
      </p>

      <p className="text-gray-600">
        📍 {props.location}
      </p>
    </div>
  );
}

export default EventCard;