import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
 
    const [projectData,setProjectData]=useState([]);
    useEffect(() => {
        fetchProjectData();
      }, []);
      const fetchProjectData = async () => {
        try {
          const response = await fetch('/api/projectData');
          const data = await response.json();
          setProjectData(data);
        } catch (error) {
          console.error(error);
        }
      };

      const handleEdit = async (projectId) => {
        const newTestSuitName = prompt('Enter the new test suit name:');
        if (newTestSuitName) {
          try {
            const response = await fetch(`/api/projectData/${projectId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ testSuitName: newTestSuitName }),
            });
            if (response.ok) {
              fetchProjectData();
            } else {
              console.error('Failed to update test suit name');
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
      
      const handleCheckboxChange =(index) =>(e)=> {
        const isChecked = e.target.checked;
        if(!isChecked)
        {
            projectData[index].isRunable='no';
        }
      }
      
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Test Suit Name</th>
                <th>No. of APIs</th>
                <th>Edit</th>
                <th>Checkbox</th>
              </tr>
            </thead>
            <tbody>
              {projectData.map((project,index) => (
                <tr key={project._id}>
                  <td>{project.testSuitName}</td>
                  <td>{project.api.length}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(project._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={project.isRunable==="yes"}
                      onChange={(e) => handleCheckboxChange( index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default HomePage;