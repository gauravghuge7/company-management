import { useState } from 'react';

import Dashboard from '../dashboard/Dashboardcontain';
import Componynavabar from '../navbar/Componynavabar';
import Projectlist from '../project/Projectlist';
import Componysidebar from '../sidebar/Componysidebar';
import Tasklist from '../task/Tasklist';
import TaskProjectlist from '../task/TaskProjectList';

function CompanyDashboard() {

  const [conditionalComponent, setConditionalComponent] = useState("");


  const [projectId, setProjectId] = useState("");

  const [currentTask, setCurrentTask] = useState({
    ticketId: "",
    ticketName: "",
    description: "",
    priority: "",
    status: "",
    ticketDocument: "",
    createdAt: "",
    updatedAt: "",
    assignedTo: "",
    projectId: "",  
  })


  return (
    <>
    
      <Componynavabar />

    <div className="d-flex">

      <Componysidebar setConditionalComponent={setConditionalComponent} />
        
        
      <div className="flex-grow-1 p-3">

        {conditionalComponent === "CompanyDashboard" && <Dashboard />}
        {conditionalComponent === "" && <Dashboard />}


        {conditionalComponent === "CompanyTasks" && <TaskProjectlist setProjectId={setProjectId} setConditionalComponent={setConditionalComponent} />}
        




        {conditionalComponent === "tasklist" && <Tasklist 
          setConditionalComponent={setConditionalComponent} 
          projectId={projectId} 
          setCurrentTask={setCurrentTask}
        />}



        {conditionalComponent === "Projectlist" && <Projectlist setConditionalComponent={setConditionalComponent} />}

      </div>



    </div>


    
    
    
    
    
    
    
    </>
  )
}

export default CompanyDashboard