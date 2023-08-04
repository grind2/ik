import { func } from "prop-types";
import { TestCase } from "../components/TestCase";
import { useState, useEffect } from "react";
import { CustomTestCase } from "../components/CustomTestCase";
import Form from "../components/Form";

export function CustomFunctionTester({ fn, input, output, tests, onFinish }) {
  /*
  console.log("fn:",fn);
  console.log(input);
  console.log(output);
  console.log(tests);
*/
const [runner, setRunner] = useState(false);
const [selectedFormIndex, setSelectedFormIndex] = useState(0);
const [wantToDie, setWantToDie] = useState(null);
  

  return (
    <>
      <div className="text-lg font-semibold flex justify-center items-center p-4">Custom Tests</div>
      
      
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/3 mx-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto p-16">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Index
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Result
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {
              tests.map((element, index) => 
                <CustomTestCase wantToDie={wantToDie} setWantToDie={setWantToDie} key={index} runner={runner} testcase={element} func={fn} elementindex={index} selectedFormIndex={selectedFormIndex} setSelectedFormIndex={setSelectedFormIndex}/>)
  }
            
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              
          </th>
          <td className="px-6 py-4">
          
          </td>
          <td className="px-6 py-4">
          
              
          </td> 
          <td className="px-6 py-4">
          <button onClick={() => {setRunner(true)}}>
              Run all ⏩
            </button>
          </td>
      </tr>
        </tbody>
    </table>
    {/* <p>INDEX:{selectedFormIndex}</p> */}
    
</div>
<Form initialInput={input} name={tests[selectedFormIndex].name}/>

      <button className="text-4xl"
        onClick={() =>
          onFinish({
            givenTests: tests,
            testResult: { achieved: 100, all: 100 },
            customTests: [],
          })
        }
      >
        🆗
      </button>
    </>
  );
}

