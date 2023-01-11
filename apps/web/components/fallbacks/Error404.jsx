const Error404 = () => (
  <>
    <title>404</title>
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center max-w-md px-8">
        <h1 className="text-2xl md:text-4xl lg:text-7xl font-black text-center">404</h1>
        <div className="text-xs md:text-sm lg:text-base max-w-sm text-center">
          Uh oh! Looks like this page does not exist or you cannot access this page.
        </div>
      </div>
    </div>
  </>
);

export default Error404;
