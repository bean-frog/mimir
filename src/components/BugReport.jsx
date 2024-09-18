import React, { useState } from "react";
export default function BugReport() {
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact || !description) {
      alert("Please fill out all required fields.");
      return;
    }
    const webhookUrl =
      "https://discord.com/api/webhooks/1285856088817795144/emDFUCaxFaFzDtXSMFTxQNsVTwVCIiPxVIiAn5aOi9KrIypc_vBHWd9qhHxrfp7gpPvw"; // Replace with your actual Discord Webhook URL
    const formData = new FormData();
    formData.append("contact", contact);
    formData.append("description", description);
    if (image) {
      formData.append("file", image);
    }

    const jsonPayload = JSON.stringify({
      content: `**Contact:** ${contact}\n**Problem Description:** ${description}`,
    });

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonPayload,
      });
      if (image) {
        await fetch(webhookUrl, {
          method: "POST",
          body: formData,
        });
      }
      alert("Thanks! We'll contact you if we need more info.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }
  };
  return (
    <dialog id="bug-modal" className="modal">
      <div className="modal-box">
        <h3 className="text-4xl font-bold text-primary norse">Report a bug</h3>
        <h3 className="text-lg text-primary">
          Mimir is still in development, so bugs may be present. Please use this
          form to report them.
        </h3>
        <div className="flex items-center mt-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-primary"
                htmlFor="contact"
              >
                How can we contact you? (required)
              </label>
              <input
                type="text"
                id="contact"
                className="w-full input input-primary"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-primary"
                htmlFor="description"
              >
                Briefly describe the problem (required)
              </label>
              <textarea
                id="description"
                className="w-full textarea textarea-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-primary"
                htmlFor="image"
              >
                Upload image (optional)
              </label>
              <input
                type="file"
                id="image"
                className="w-full file-input file-input-primary"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="outline-none p-2 py-1 border border-solid bg-ctp-mantle border-primary hover:scale-[1.05] hover:bg-ctp-surface0 rounded-md active:scale-95"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <p className="py-4 pb-2">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="backdrop-blur-md modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
