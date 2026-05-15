const Banner = () => {
  return (
    <div className="bg-[url('/assets/banner.png')] bg-cover bg-center text-white flex justify-between flex-col items-center gap-5 h-[600px] relative">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="relative z-10 p-10 text-center flex justify-center flex-col items-center gap-6 flex-1 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Discover Your <br /> Next Adventure
        </h1>

        <p className="text-xl md:text-2xl max-w-2xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="flex flex-wrap justify-center gap-5 mt-4">
          <button className="btn btn-info rounded-none text-white px-8 uppercase border-none">
            Explore Now
          </button>

          <button className="btn bg-white/30 hover:bg-white/40 text-white border-none rounded-none px-8 uppercase backdrop-blur-md">
            View Destination
          </button>
        </div>
      </div>

      <div className="relative z-10 bg-white/20 backdrop-blur-md flex flex-wrap justify-between gap-2 w-full items-center px-4 overflow-hidden">
        <div className="p-4">
          <h3 className="text-sm font-bold">Location</h3>
          <p className="text-xs opacity-80">Address, City or Zip</p>
        </div>

        <div className="divider divider-horizontal before:bg-white/30 after:bg-white/30 m-0"></div>

        <div className="p-4">
          <h3 className="text-sm font-bold">Date/Duration</h3>
          <p className="text-xs opacity-80">Anytime/3 Days</p>
        </div>

        <div className="divider divider-horizontal before:bg-white/30 after:bg-white/30 m-0"></div>

        <div className="p-4">
          <h3 className="text-sm font-bold">Budget</h3>
          <p className="text-xs opacity-80">$0-$3000</p>
        </div>

        <div className="divider divider-horizontal before:bg-white/30 after:bg-white/30 m-0"></div>

        <div className="p-4">
          <h3 className="text-sm font-bold">People</h3>
          <p className="text-xs opacity-80">5-10</p>
        </div>

        <div className="bg-info hover:bg-info/90 transition-colors py-6 px-10 cursor-pointer ml-auto">
          <h3 className="font-bold">Search</h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;