import { func } from "prop-types";
import { TestCase } from "../components/TestCase";
import { useState } from "react";

export function FunctionTester({ fn, input, output, tests, onFinish }) {
  /*
  console.log("fn:",fn);
  console.log(input);
  console.log(output);
  console.log(tests);
*/
  const [totalPoints, setTotalPoints] = useState(0);
  const [runner, setRunner] = useState(false);

  const maxPoints = tests.reduce((total, e) => total + e.points, 0);

  const runAll = () => {
    setRunner(true)

    console.log("runall")
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold flex justify-center items-center p-4">FunctionTester</h1>

      <div className="text-lg font-semibold flex justify-center items-center p-4" >Function</div>
      <div className="flex font-light justify-center items-center p-1">{fn.toString()}</div>

      <div className="text-lg font-semibold flex justify-center items-center p-4">Tests</div>
      
      
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/3 mx-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto p-16 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Result
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                <th scope="col" className="px-6 py-3">
                    Points
                </th>
            </tr>
        </thead>
        <tbody>
            {
              tests.map((element, index) => 
                <TestCase key={index} runner={runner} testcase={element} func={fn} totalPoints={totalPoints} setTotalPoints={setTotalPoints} />)
            }
            
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              
          </th>
          <td className="px-6 py-4">
          
          </td>
          <td className="px-6 py-4">
          <button onClick={runAll} >
              Run all ⏩
            </button>
              
          </td>
          <td className="px-6 py-4 w-56">
              total points: {totalPoints} / {maxPoints}
          </td>
      </tr>
        </tbody>
    </table>
</div>
    </>
  );
}

