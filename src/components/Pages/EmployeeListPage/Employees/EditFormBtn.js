export const EditFormBtn = function ({ toEditData }) {
  // console.log(toEditData)

  return (
    <button
      onClick={() => console.log(toEditData)}
      className="btn btn-primary mx-2"
    >
      Ediit
    </button>
  );
};
