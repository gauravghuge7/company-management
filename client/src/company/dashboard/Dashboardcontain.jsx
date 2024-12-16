import React from 'react';
import Componynavabar from '../navbar/Componynavabar';
import MyCalendar from './MyCalendar';
import Clock from './Clock';

const Watch = () => {
    return (
        <div className="container mt-5">
            {/* Header Section */}
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        {/* Completed Tasks Card */}
                        <div className="col-md-4 mb-4">
                            <div className="card text-white " style={cardStyle} 
                                 onMouseEnter={(e) => { e.currentTarget.style.boxShadow = hoverStyle.boxShadow; }}
                                 onMouseLeave={(e) => { e.currentTarget.style.boxShadow = cardStyle.boxShadow; }}>
                                <div className="card-header d-flex justify-content-center" style={headerStyle}>Completed Ticket</div>
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-center" style={titleStyle}>10 Ticket</h5>
                                    <p className="card-text" style={textStyle}>All Ticket that have been successfully completed.</p>
                                </div>
                            </div>
                        </div>

                        {/* Pending Tasks Card */}
                        <div className="col-md-4 mb-4">
                            <div className="card text-white " style={cardStyle} 
                                 onMouseEnter={(e) => { e.currentTarget.style.boxShadow = hoverStyle.boxShadow; }}
                                 onMouseLeave={(e) => { e.currentTarget.style.boxShadow = cardStyle.boxShadow; }}>
                                <div className="card-header d-flex justify-content-center" style={headerStyle}>Pending Ticket</div>
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-center" style={titleStyle}>5 Ticket</h5>
                                    <p className="card-text" style={textStyle}>Ticket that are still in progress and need to be completed.</p>
                                </div>
                            </div>
                        </div>

                        {/* To-Do Tasks Card */}
                        <div className="col-md-4 mb-4">
                            <div className="card text-white " style={cardStyle} 
                                 onMouseEnter={(e) => { e.currentTarget.style.boxShadow = hoverStyle.boxShadow; }}
                                 onMouseLeave={(e) => { e.currentTarget.style.boxShadow = cardStyle.boxShadow; }}>
                                <div className="card-header d-flex justify-content-center" style={headerStyle}>To-Do Ticket</div>
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-center" style={titleStyle}>8 Tasks</h5>
                                    <p className="card-text" style={textStyle}>Ticket that are planned but not yet started. To-Do Ticket.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 d-flex  align-items-space-between ">
               
                   <div className='col-md-12  me-2'> <MyCalendar /></div>
                   {/* <div className='col-md-3 d-flex justify-content-center align-items-center'> <Clock /></div> */}
                </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styling Variables
const cardStyle = {
    borderRadius: '10px',
    boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.3), 8px 8px 25px rgba(0, 0, 0, 0.2)', 
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', 
    cursor: 'pointer',
    width: '100%', 
    maxWidth: '400px', 
    backgroundColor: "#77AFDC",
};

const hoverStyle = {
    boxShadow: '6px 6px 30px rgba(0, 0, 0, 0.5), 12px 12px 40px rgba(0, 0, 0, 0.3)', 
};

const headerStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
};

const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
};

const textStyle = {
    fontSize: '1rem',
};

export default Watch;
