export default function Options({ enabledJournals, handleSettingChange }) {
  return (
    <dialog id="options-modal" className="modal">
      <div className="modal-box">
        <h3 className="text-4xl font-bold text-primary norse">Options</h3>
        <h1 className="text-lg text-primary">Enabled sources:</h1>
        <div className="flex flex-col items-start space-y-2">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="sage"
              checked={enabledJournals.sage}
              onChange={handleSettingChange}
            />
            SAGE
          </label>
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="plos"
              checked={enabledJournals.plos}
              onChange={handleSettingChange}
            />
            PLOS
          </label>
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="arxiv"
              checked={enabledJournals.arxiv}
              onChange={handleSettingChange}
            />
            arXiv
          </label>
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="rsf"
              checked={enabledJournals.rsf}
              onChange={handleSettingChange}
            />
            RSF
          </label>
        </div>
        <p className="py-4 pb-2">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="backdrop-blur-md modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
