// import React, { useState } from 'react';
// import NavBar from './NavBar';
// import UserHome from "./UserHome"
// import { Container } from 'react-bootstrap';
// import AddCourse from '../user/teacher/AddCourse';

// const Dashboard = () => {
//    const [selectedComponent, setSelectedComponent] = useState('home');

//    const renderSelectedComponent = () => {
//       switch (selectedComponent) {
//          case 'home':
//             return <UserHome />
//          case 'addcourse':
//            return <AddCourse />
//          default:
//             return <UserHome />

//       }
//    };

//    return (
//       <>
//          <NavBar setSelectedComponent={setSelectedComponent} />
//          <Container className='my-3'>
//             {renderSelectedComponent()}
//          </Container>
//       </>
//    );
// };

// export default Dashboard;


import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import UserHome from "./UserHome"
import { Container } from 'react-bootstrap';
import AddCourse from '../user/teacher/AddCourse';
import StudentHome from '../user/student/StudentHome';
import AdminHome from '../admin/AdminHome';
import { UserContext } from '../../App';
import EnrolledCourses from '../user/student/EnrolledCourses';
import CourseContent from '../user/student/CourseContent';
import AllCourses from '../admin/AllCourses';


const Dashboard = () => {
   const user = useContext(UserContext)
   const userRole = user?.userData?.role || 'student'; // Default to student if not set
   const [selectedComponent, setSelectedComponent] = useState('home');

   const renderSelectedComponent = () => {
      if (userRole === 'admin') {
         switch (selectedComponent) {
            case 'home':
               return <AdminHome />
            case 'allcourses':
               return <AllCourses />
            default:
               return <AdminHome />
         }
      } else if (userRole === 'teacher') {
         switch (selectedComponent) {
            case 'home':
               return <UserHome />
            case 'addcourse':
               return <AddCourse />
            default:
               return <UserHome />
         }
      } else { // student
         switch (selectedComponent) {
            case 'home':
               return <StudentHome />
            case 'enrolledcourses':
               return <EnrolledCourses />
            case 'coursecontent':
               return <CourseContent />
            default:
               return <StudentHome />
         }
      }
   };
   return (
      <>
         <NavBar setSelectedComponent={setSelectedComponent} />
         <Container className='my-3'>
            {renderSelectedComponent()}
         </Container>
      </>
   );
};

export default Dashboard;


