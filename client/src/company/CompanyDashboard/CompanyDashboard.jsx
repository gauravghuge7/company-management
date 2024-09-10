import  { useState } from 'react'
import Componysidebar from '../sidebar/Componysidebar'
import Dashboard from '../dashboard/Dashboardcontain'
import Tasklist from '../task/Tasklist'
import TaskForm from '../task/Taskform'
import ProjectForm from '../project/Projectform'
import Projectlist from '../project/Projectlist'
import Componynavabar from '../navbar/Componynavabar'

function CompanyDashboard() {

  const [conditionalComponent, setConditionalComponent] = useState("");


  return (
    <>
    
      <Componynavabar />

    <div className="d-flex">

      <Componysidebar setConditionalComponent={setConditionalComponent} />
        
        
      <div className="flex-grow-1 p-3">

        {conditionalComponent === "CompanyDashboard" && <Dashboard />}
        {conditionalComponent === "" && <Dashboard />}
        {conditionalComponent === "CompanyTasks" && <Tasklist setConditionalComponent={setConditionalComponent} />}
        {conditionalComponent === "addTask" && <TaskForm />}
        {conditionalComponent === "projectform" && <ProjectForm  />}
        {conditionalComponent === "Projectlist" && <Projectlist setConditionalComponent={setConditionalComponent} />}

      </div>



     </div>
    
    
    
    
    
    
    </>
  )
}

export default CompanyDashboard