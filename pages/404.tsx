import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <h1>No Page Here :((</h1>
      <Link href="/" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default Custom404;
