// import React from 'react';
// import { IconHome, IconSettings, IconUser } from 'twenty-ui';
//
// const navigationItems = [
//   {
//     name: 'Home',
//     Icon: IconHome,
//     onClick: () => console.log('Home clicked'),
//   },
//   {
//     name: 'Profile',
//     Icon: IconUser,
//     onClick: () => console.log('Profile clicked'),
//   },
//   {
//     name: 'Settings',
//     Icon: IconSettings,
//     onClick: () => console.log('Settings clicked'),
//   },
// ];
// export const FunnelminkScheduler = () => {
//   return (
//     <div>
//       {/*<NavigationBar activeItemName="Home" items={navigationItems} />*/}
//       <h1>Scheduling (TODO)</h1>
//       {/*<FunnelminkSidebar />*/}
//       {/*<FunnelminkSchedulingCalendar />*/}
//     </div>
//   );
// };
//
// const FunnelminkSidebar = () => (
//   <div className="sidebar">
//     <h2>Crews</h2>
//     <FunnelminkCrewList />
//   </div>
// );
//
// const FunnelminkCrewList = () => {
//   const crews = ['Crew 1', 'Crew 2', 'Crew 3', 'Crew 4'];
//
//   return (
//     <ul>
//       {crews.map((crew, index) => (
//         <li key={index}>{crew}</li>
//       ))}
//     </ul>
//   );
// };
//
// const FunnelminkSchedulingCalendar = () => (
//   <div className="calendar">
//     <h2>Schedule</h2>
//     <div className="calendar-grid">
//       {/*<FunnelminkJobCard*/}
//       {/*  crew="Crew 1"*/}
//       {/*  job="Install C1907-452131"*/}
//       {/*  time="08:00 - 10:00"*/}
//       {/*/>*/}
//       {/*<FunnelminkJobCard*/}
//       {/*  crew="Crew 2"*/}
//       {/*  job="Service C1907-483765"*/}
//       {/*  time="09:00 - 11:00"*/}
//       {/*/>*/}
//       {/*<FunnelminkJobCard*/}
//       {/*  crew="Crew 3"*/}
//       {/*  job="Refit C1908-489528"*/}
//       {/*  time="10:00 - 12:00"*/}
//       {/*/>*/}
//       {/* Add more Job components as needed */}
//     </div>
//   </div>
// );
//
// // const FunnelminkJobCard = ({ crew, job, time }) => (
// //   <div className="job">
// //     <p>
// //       <strong>{crew}</strong>
// //     </p>
// //     <p>{job}</p>
// //     <p>{time}</p>
// //   </div>
// // );
