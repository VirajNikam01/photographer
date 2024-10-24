const Footer = () => {
  return (
    <div className="w-full pb-20">
      <h1 className="font-bold text-4xl text-teal-600">
        Contact Details <span className="text-red-600 text-5xl">.</span>
      </h1>
      <h1 className="text-base my-3 font-semibold">
        Feel free to contact me through the following platforms. Also, please
        check out my work on Instagram and Youtube.
      </h1>

      <div className="social flex flex-wrap gap-3 select-none">
        <div className="instagram text-3xl cursor-pointer hover:scale-125 duration-300">
          📸
        </div>
        <div className="yt text-3xl cursor-pointer hover:scale-125 duration-300">
          ❤️
        </div>
      </div>
    </div>
  );
};

export default Footer;
