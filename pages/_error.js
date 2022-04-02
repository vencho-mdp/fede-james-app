import Title from "../components/Title";

function Error({ statusCode }) {
  return (
    <Title
      className="my-16"
      text={
        statusCode === 404 ? "Esta página no existe" : "Ha Ocurrido un Error"
      }
    />
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
