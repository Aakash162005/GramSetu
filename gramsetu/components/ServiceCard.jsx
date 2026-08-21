function ServiceCard(props) {
  return (
    <div className="border rounded-xl p-6 shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">
        {props.title}
      </h2>

      <p className="text-gray-600">
        {props.description}
      </p>
    </div>
  );
}

export default ServiceCard;