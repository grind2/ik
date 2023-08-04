import { useState, useEffect } from "react";

export function TestCase({testcase, func, totalPoints, setTotalPoints, runner, setRunner}) {

  const [eredmeny, setEredmeny] = useState("⬜")
  const [isAdded, setIsAdded] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleClick = () => {
    console.log(testcase.testFn(func), !isAdded);
    if (testcase.testFn(func)) {
      if (!isAdded) {
        setEredmeny("✅");
        setTotalPoints(prevPoints => prevPoints + testcase.points);
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
  


    return (
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {testcase.name}
          </th>
          <td className="px-6 py-4">
            {eredmeny}
          </td>
          <td className="px-6 py-4">
            <button onClick={handleClick}>
            ▶️
            </button>
              
          </td>
          <td className="px-6 py-4">
              {testcase.points}
          </td>
      </tr>
    );
  }
