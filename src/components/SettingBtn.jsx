const SettingBtn = ({
  clickHandler,
  isOn,
  onPath,
  offPath,
  showBtnCondition = true,
}) => {
  const svgs = (
    <>
      <svg
        className={`transition-colors size-9 ${isOn === undefined || isOn ? "block" : "hidden"}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          className="transition-fill fill-black group-hover:fill-white"
          d={onPath}
        />
      </svg>
      {offPath && (
        <svg
          className={`transition-colors size-9 ${isOn ? "hidden" : "block"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            className="transition-fill fill-black group-hover:fill-white"
            d={offPath}
          />
        </svg>
      )}
    </>
  );

  return (
    showBtnCondition && (
      <button
        type="button"
        onClick={clickHandler}
        className="group
          transition-colors size-14 rounded-full shadow-md bg-zinc-200 border-4 border-black
          m-3 mx-2 flex justify-center items-center cursor-pointer hover:border-white
          hover:bg-zinc-900"
      >
        {svgs}
      </button>
    )
  );
};

export default SettingBtn;
