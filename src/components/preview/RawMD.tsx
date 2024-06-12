import {useSectionStore} from "../../store";
import {handleMDFormart} from "../../utils";

export const RawMD = () => {
  const {sections} = useSectionStore();

  return (
    <textarea
      disabled
      readOnly
      className="h-full w-full resize-none overflow-y-auto p-5"
      id="textarea-raw-code"
      value={handleMDFormart(sections)}
    />
  );
};
