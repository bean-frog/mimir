import BugReport from "./components/BugReport";
import Credits from "./components/Credits";
import Options from "./components/Options";
import Result from "./components/Result";
import "./norse.css";
import React, { useState } from "react";

function App() {
  const [queryTerms, setQueryTerms] = useState("");
  const [searchResults, setSearchResults] = useState([]); // New state for search results
  const [enabledJournals, setEnabledJournals] = useState({
    sage: true,
    plos: true,
    arxiv: true,
    rsf: true,
  });

  const handleSettingChange = (event) => {
    const { name, checked } = event.target;
    setEnabledJournals((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const searchAllEnabledJournals = async (event, query) => {
    event.preventDefault();
    const jounalIssnNums = {
      sage: "2158-2440",
      plos: "1932-6203",
      arxiv: "2331-8422",
      rsf: "2377-8261",
    };
    const enabledJournalsList = Object.keys(enabledJournals).filter(
      (journal) => enabledJournals[journal],
    );

    try {
      const allResults = await Promise.all(
        enabledJournalsList.map((journal) => {
          const issn = jounalIssnNums[journal];
          return search(event, query, issn);
        }),
      );

      const combinedResults = allResults.flat();
      setSearchResults(combinedResults);

      console.log("Combined Results:", combinedResults);
    } catch (error) {
      console.error("Error searching journals:", error);
    }
  };

  const search = async (event, query, issn) => {
    event.preventDefault();
    if (query) {
      query = query.trim().toLowerCase().replace(/\s+/g, '+');
      try {
        const response = await fetch(
          `https://api.crossref.org/journals/${issn}/works?query=${query}&select=DOI,title,author,published,publisher`,
          {
            headers: {
              "User-Agent":
                "Mimir/0.1-alpha (https://github.com/bean-frog/mimir; mailto:gkieran32855@gmail.com)",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let responseArray = [];

        data.message.items.forEach((item) => {
          let author;
          let author1 = item.author[0];

          if (item.author.length > 2) {
            author = `${author1.given} ${author1.family} et al.`;
          } else if (item.author.length === 2) {
            let author2 = item.author[1];
            author = `${author1.given} ${author1.family}, ${author2.given} ${author2.family}`;
          } else if (item.author.length === 1) {
            author = `${author1.given} ${author1.family}`;
          } else {
            console.log(
              "If you're seeing this, there is a paper that exists but nobody wrote. please inform the nearest quantum physicist",
            );
          }

          let temp = {
            title: item.title[0],
            author: author,
            doi: item.DOI,
            year: item.published["date-parts"][0][0],
            source: item.publisher,
          };
          responseArray.push(temp);
        });

        return responseArray;
      } catch (error) {
        console.error("Error searching:", error);
      }
    }
  };

  return (
    <>
      <Credits />
      <Options
        enabledJournals={enabledJournals}
        handleSettingChange={handleSettingChange}
      />
      <BugReport />
      <div className="flex flex-col items-center w-screen h-screen bg-ctp-mantle">
        <span className="flex flex-row gap-2 items-start m-2 w-screen h-fit">
          <button
            className="outline-none p-2 py-1 border border-solid bg-ctp-mantle border-primary hover:scale-[1.05] hover:bg-ctp-surface0 rounded-md active:scale-95"
            onClick={() => document.getElementById("credits-modal").showModal()}
          >
            info/credits
          </button>
          <button
            className="outline-none p-2 py-1 border border-solid bg-ctp-mantle border-primary hover:scale-[1.05] hover:bg-ctp-surface0 rounded-md active:scale-95"
            onClick={() => document.getElementById("bug-modal").showModal()}
          >
            report bug
          </button>
          <button
            className="outline-none p-2 py-1 border border-solid bg-ctp-mantle border-primary hover:scale-[1.05] hover:bg-ctp-surface0 rounded-md active:scale-95"
            onClick={() => document.getElementById("options-modal").showModal()}
          >
            options
          </button>
        </span>
        <header className="flex flex-col justify-center items-center w-full">
          <h1 className="mb-4 text-6xl tracking-wider text-primary norse">
            Mimir
          </h1>
          <form
            onSubmit={(e) => searchAllEnabledJournals(e, queryTerms)}
            className="flex justify-center w-full"
          >
            <input
              type="text"
              placeholder="I'm looking for an article about..."
              onChange={(e) => setQueryTerms(e.target.value)}
              className="px-4 py-2 w-1/2 outline-none h-fit input input-primary"
            />
            <button
              type="submit"
              className="outline-none ml-2 p-2 py-1 border border-solid bg-ctp-mantle border-primary hover:scale-[1.05] hover:bg-ctp-surface0 rounded-md active:scale-95"
            >
              Search
            </button>
          </form>
        </header>

        {/*Result container */}
        <main className="grid overflow-y-scroll gap-2 p-4 mt-8 w-full h-full bg-ctp-crust lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          {searchResults.length > 0 ? (
            searchResults
              .filter(
                (result) =>
                  result &&
                  result.title &&
                  result.author &&
                  result.year &&
                  result.doi,
              ) // Filter out malformed results
              .map((result, index) => (
                <Result
                  key={index}
                  year={result.year}
                  source={result.source}
                  author={result.author}
                  title={result.title}
                  doi={`https://doi.org/${result.doi}`}
                />
              ))
          ) : null}
        </main>
      </div>
    </>
  );
}

export default App;
