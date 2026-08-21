function NoticeCard(props) {
  return (
    <div className="border-l-4 border-green-600 bg-white p-5 shadow rounded">
      <h2 className="font-bold text-lg">
        {props.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {props.description}
      </p>

      <p className="text-sm text-gray-400 mt-3">
        {props.date}
      </p>
    </div>
  );
}

export default NoticeCard;