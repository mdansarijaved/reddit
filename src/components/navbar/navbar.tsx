"use client";

export default function Navbar() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full">
        <ul className="md:flex lg:gap-10 gap-6 text-white">
          <button className={`hover:text-[#3cffd0]`}>reddit</button>
        </ul>
        <form
          className={`md:flex bg-[#292929] rounded-lg hidden px-2 items-center group`}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* <Search
            className={`hover:text-[#3cffd0] text-white cursor-pointer ${isSearchResultsPage ? "hover:text-[#a980ff]" : ""}`}
            size={16}
            onClick={handleClick}
          /> */}
          <input
            // ref={searchInputRef}
            type="text"
            className={` h-7 w-60 lg:w-96 placeholder:text-sm font-franklin placeholder:font-franklin placeholder:text-center bg-[#292929] text-white outline-none px-4 text-sm`}
            placeholder="Search"
          />
        </form>
      </div>
    </>
  );
}
