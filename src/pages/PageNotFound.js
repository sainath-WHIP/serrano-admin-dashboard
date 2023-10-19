function PageNotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-[#c4c4c4]">
        <div className="text-2xl text-black font-medium">404 PageNotFound</div>
        <a href="/dashboard" className="mt-6 text-black text-base font-medium hover:underline">Back to Dashboard</a>
      </div>
    </>
  );
}

export default PageNotFound;
