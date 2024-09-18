export default function Credits() {
  return (
    <dialog id="credits-modal" className="modal">
      <div className="modal-box">
        <h3 className="text-4xl font-bold text-primary norse">Info</h3>
        <h1 className="text-lg">
          Mimir is a free research tool developed by an AP Seminar/AP Research
          student. It aims to search across multiple sources at once and return
          only free/open access articles.
        </h1>
        <h1 className="text-lg">
          Mimir is open source, and you can view its code{" "}
          <a
            href="http://github.com/bean-frog/mimir"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary"
          >
            here
          </a>
        </h1>

        <h3 className="text-4xl font-bold text-primary norse">Credits</h3>
        <h1 className="text-lg">
          Thanks to{" "}
          <a
            href="http://crossref.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary"
          >
            CrossRef
          </a>{" "}
          for allowing their API to stay freely accessible
        </h1>
        <h1 className="text-lg">
          Shoutout to Paul from Sage Journals support team for being helpful :)
          (if you're Paul's boss please give him a raise)
        </h1>
        <p className="py-4 pb-2">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="backdrop-blur-md modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
