const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
      <h1 className="text-white text-4xl font-bold">ASTERISK</h1>
    </div>
  );
};

export default Loader;
