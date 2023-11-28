import { useEffect, useState } from "react";

type Data = {
  id: string;
  name: string;
  category: string;
};

const url: Data[] = [
  {
    id: "sign-up-form",
    name: "Sign-Up Form",
    category: "HTML",
  },
  {
    id: "javascript-circles",
    name: "javascript Circles",
    category: "JavaScript",
  },
  {
    id: "javascript-sqares",
    name: "javascript Squares",
    category: "JavaScript",
  },
  {
    id: "rainbow-circles",
    name: "Rainbow Circles",
    category: "CSS",
  },
];

const Test = () => {
  const [HTMLData, setHTMLData] = useState<Data[]>([]);
  const [CSSData, setCSSData] = useState<Data[]>([]);
  const [JavaScriptData, setJavaScriptData] = useState<Data[]>([]);

  useEffect(() => {
    url.map((data) => {
      if (data.category === "HTML")
        setHTMLData((prevState) => {
          return [...prevState, data];
        });
      else if (data.category === "CSS")
        setCSSData((prevState) => {
          return [...prevState, data];
        });
      else if (data.category === "JavaScript")
        setJavaScriptData((prevState) => {
          return [...prevState, data];
        });
    });
  }, []);

  const displayData = (data: Data) => {
    return (
      <div key={data.id}>
        <h3>{data.name}</h3>
      </div>
    );
  };

  return (
    <>
      <div>
        <h2>HTML</h2>
        {HTMLData.length &&
          HTMLData.map((data) => {
            return displayData(data);
          })}
      </div>
      <div>
        <h2>CSS</h2>
        {CSSData.length &&
          CSSData.map((data) => {
            return displayData(data);
          })}
      </div>
      <div>
        <h2>JavaScript</h2>
        {JavaScriptData.length &&
          JavaScriptData.map((data) => {
            return displayData(data);
          })}
      </div>
    </>
  );
};

export default Test;
