export default function (props) {
  return (
    <div className="p-4 w-full rounded-md border border-solid h-fit bg-mantle border-primary">
      <div className="flex flex-row gap-2 justify-center h-full w-fit">
        <h1 className="px-2 text-lg text-white rounded-full border border-solid bg-ctp-crust border-primary">
          {props.year}
        </h1>
        <h1 className="px-2 text-lg text-white rounded-full border border-solid bg-ctp-crust border-primary">
          {props.source}
        </h1>
      </div>
      <h1 className="text-lg font-bold text-white">{props.title}</h1>
      <h1 className="text-white text-md">{props.author}</h1>
      <h1 className="text-white underline text-md">
        <a href={props.doi} target="_blank" rel="noopener noreferrer">
          {props.doi}
        </a>
      </h1>
    </div>
  );
}
