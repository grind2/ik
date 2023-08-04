import { element } from "prop-types";
import { useState, useEffect } from "react";
import Form from "../components/Form";

export function CustomTestCase({testcase, func, runner, setRunner, elementindex, selectedFormIndex, setSelectedFormIndex, wantToDie, setWantToDie}) {

  const [eredmeny, setEredmeny] = useState("⬜")
  const [isAdded, setIsAdded] = useState(false);
  const [complete, setComplete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  let frame = 0;
    if (selectedFormIndex == elementindex){
        frame = "Currently active";
    } else {
        frame = "";
    }

  const handleClick = () => {
    console.log(testcase.testFn(func), !isAdded);
    if (testcase.testFn(func)) {
      if (!isAdded) {
        setEredmeny("✅");
        setIsAdded(true);
      }  
    } else {
      setEredmeny("❌");
    }
  };
  
  // console.log("runnervvalue", runner)
  useEffect(() => {
    if (runner && !complete) {
      console.log("lefut: ", testcase.testFn)
      handleClick();
      setComplete(true);
    }
  }, [runner, complete]);
  

  const handleEdit = () => {
    console.log("edit this: ", elementindex)
    setSelectedFormIndex(elementindex);
  };

  const handleDelete = () => {
    setDeleted(true);
    console.log(deleted)
  };


    return ( !deleted && (
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-solid border-red-600">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {elementindex+1}
          </th>
          <td className="px-6 py-4">
            {testcase.name}
          </td>
          <td className="px-6 py-4">
            {eredmeny}
          </td>
          <td className="px-6 py-4 w-56">
            <button onClick={handleClick}>
            ▶️
            </button>
            <button onClick={handleEdit}>
            ✏️
            </button>
            <button onClick={handleDelete}>
            🗑️ {frame}
            </button>
          </td>
      </tr>
    ));
  }
