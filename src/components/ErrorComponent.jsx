const ErrorComponent = ({ error }) => {
  console.log(error.response.status);
  return (
    <div className="m-10">
      <p>Something went wrong!</p>
      {error.response.status === 400 ? (
        <p>
          Check the{" "}
          <span className=" text-red-700">
            {error.response.data.msg.slice(12)}
          </span>{" "}
          query
        </p>
      ) : null}
      {error.response.status === 404 ? <p>Page not found</p> : null}
    </div>
  );
};
export default ErrorComponent;
