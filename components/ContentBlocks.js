export const RenderBlocks = ({ blocks }) => {
  const renderTable = (block) => {
    const table = block.table;
    if (!table || !table.table_width) return null;

    return (
      <div className="my-6 overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {table.has_column_header && table.children?.[0] && (
                <>
                  {table.children[0].table_row?.cells?.map(
                    (cell, cellIndex) => (
                      <th
                        key={cellIndex}
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        {cell.map((richText) => richText.plain_text).join("")}
                      </th>
                    ),
                  )}
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.children
              ?.slice(table.has_column_header ? 1 : 0)
              .map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {row.table_row?.cells?.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >
                      {cell.map((richText) => richText.plain_text).join("")}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return blocks.map((block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case "divider":
        return <hr className="my-8 w-full border" key={id} />;

      case "paragraph":
        return <Text text={value.rich_text} id={id} key={id} />;

      case "heading_1":
        return <Heading text={value.rich_text} id={id} level={type} key={id} />;

      case "heading_2":
        return <Heading text={value.rich_text} id={id} level={type} key={id} />;

      case "heading_3":
        return <Heading text={value.rich_text} id={id} level={type} key={id} />;

      case "quote":
        return (
          <blockquote
            key={id}
            className="my-6 border-l-4 border-blue-500 bg-blue-50 py-2 pl-6"
          >
            <SpanText id={id} text={value.rich_text} />
          </blockquote>
        );

      case "bulleted_list_item":
      case "numbered_list_item":
        return <ListItem key={id} value={value} id={id} type={type} />;

      case "to_do":
        return <ToDo key={id} value={value} id={id} />;

      case "toggle":
        return <Toggle key={id} value={value} />;

      case "table":
        return renderTable(block);

      case "image":
        const imageSrc =
          value.type === "external" ? value.external.url : value.file.url;
        const caption = value.caption.length ? value.caption[0].plain_text : "";
        return (
          <figure key={id} className="my-8 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={caption}
              src={imageSrc}
              className="mx-auto h-auto max-w-full rounded-lg shadow-lg"
              style={{ maxHeight: "500px" }}
            />
            {caption && (
              <figcaption className="mt-3 text-sm text-gray-500">
                {caption}
              </figcaption>
            )}
          </figure>
        );

      default:
        return (
          <div
            key={id}
            className="my-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4"
          >
            <p className="text-sm text-yellow-800">
              <strong>Unsupported block:</strong>{" "}
              {type === "unsupported" ? "unsupported by Notion API" : type}
            </p>
          </div>
        );
    }
  });
};

const SpanText = ({ text, id }) => {
  if (!text) return null;

  return text.map((value, i) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    // Handle color mapping
    const colorClasses = {
      gray: "text-gray-500",
      brown: "text-amber-800",
      orange: "text-orange-500",
      yellow: "text-yellow-500",
      green: "text-green-500",
      blue: "text-blue-500",
      purple: "text-purple-500",
      pink: "text-pink-500",
      red: "text-red-500",
    };

    return (
      <span
        key={id + i}
        className={[
          bold ? "font-bold" : "",
          code ? "rounded bg-gray-100 p-1 font-mono text-sm" : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline" : "",
          color !== "default" ? colorClasses[color] || "" : "",
        ].join(" ")}
      >
        {text.link ? (
          <a
            href={text.link.url}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};

const Text = ({ text, id }) => {
  return (
    <p className="mb-4 leading-relaxed text-gray-700">
      <SpanText text={text} id={id} />
    </p>
  );
};

const ListItem = ({ value, id, type }) => {
  const Tag = type === "bulleted_list_item" ? "ul" : "ol";

  return (
    <Tag
      className={
        type === "bulleted_list_item"
          ? "mb-2 ml-6 list-disc"
          : "mb-2 ml-6 list-decimal"
      }
    >
      <li>
        <SpanText text={value.rich_text} id={id} />
        {value.children?.map((child) => {
          if (
            child.type === "bulleted_list_item" ||
            child.type === "numbered_list_item"
          ) {
            return (
              <ListItem
                key={child.id}
                value={child[child.type]}
                id={child.id}
                type={child.type}
              />
            );
          }
          return null;
        })}
      </li>
    </Tag>
  );
};

const Heading = ({ text, level, id }) => {
  switch (level) {
    case "heading_1":
      return (
        <h1 className="my-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          <SpanText text={text} id={id} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="my-5 text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
          <SpanText text={text} id={id} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="my-4 text-xl font-bold tracking-tight text-gray-700 md:text-2xl">
          <SpanText text={text} id={id} />
        </h3>
      );
    default:
      return null;
  }
};

const ToDo = ({ id, value }) => {
  return (
    <div className="my-2">
      <label htmlFor={id} className="flex items-start">
        <input
          type="checkbox"
          id={id}
          defaultChecked={value.checked}
          className="mr-3 mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span
          className={
            value.checked ? "text-gray-500 line-through" : "text-gray-700"
          }
        >
          <SpanText text={value.rich_text} id={id} />
        </span>
      </label>
    </div>
  );
};

const Toggle = ({ value, id }) => {
  return (
    <details className="my-4 rounded-lg border border-gray-200 p-4">
      <summary className="cursor-pointer list-none font-medium text-gray-800">
        <SpanText text={value.rich_text} id={id} />
      </summary>
      <div className="mt-3 pl-2">
        {value.children?.map((block) => {
          if (block.type === "paragraph") {
            return (
              <Text
                key={block.id}
                text={block.paragraph.rich_text}
                id={block.id}
              />
            );
          }
          return null;
        })}
      </div>
    </details>
  );
};
