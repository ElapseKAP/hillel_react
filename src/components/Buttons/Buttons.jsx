import { replaceSpace } from "../../utils/helpers";

function Buttons({ taskStatus, statusMap, taskId, onBtnClick }) {
  return (
    <div className="buttons-wrap">
      {Object.keys(statusMap).map((status) => {
        if (+status !== +taskStatus) {
          return (
            <button
              key={`btn-${status}`}
              className={`btn btn-${replaceSpace(statusMap[status].name)}`}
              data-id={taskId}
              data-status-name={status}
              onClick={onBtnClick}
            >
              {statusMap[status].name}
            </button>
          );
        }
      })}
    </div>
  );
}

export default Buttons;
