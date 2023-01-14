import React, { Fragment, useState } from "react";
import useDocumentFile from "./useDocumentFIle";

function CounterF(props) {
  // const array = useState(0);
  // const count = array[0];
  // const setState = array[1];

  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  /*   useEffect(() => {
    document.title = `${name} has clicked ${count} times.`;
    return () => {
      console.log("Clean Up")
    }
  }); */

  useDocumentFile(`${name} has clicked ${count} times.`);

  return (
    <Fragment>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <div>
        {name} has clicked {count} times
      </div>
      <button onClick={() => setCount(count + 1)}>increase</button>
    </Fragment>
  );
}

export default CounterF;
