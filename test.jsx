import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState } from 'react';


const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const tempStudentsData = [];
  const tempSchoolsData = [];
  const tempLegalguardiansData = [];

  const onStudentsPick = async (studentIds) => {
    tempStudentsData = [];
    tempSchoolsData = [];
    tempLegalguardiansData = [];

    for (const studentId of studentIds) {
      
      // load data that is not already in state
      let studentData = studentsData.find((student) => (student.id === studentId));
      if (!studentData) {
        studentData = await fetchStudentData(studentId);
      }
      tempStudentsData.push(studentData);

      const { schoolId, legalguardianId } = studentData;

      // load data that is not already in state
      let schoolData = schoolsData.find((school) => school.id === schoolId);
      if (!schoolData) {
        schoolData = await fetchSchoolData(schoolId);
      } 
      tempSchoolsData.push(schoolData);
      
      // load data that is not already in state
      let legalguardianData = schoolsData.find((legalguardian) => legalguardian.id === legalguardianId);
      if (!legalguardianData) {
        legalguardianData = await fetchLegalguardianData(legalguardianId);
      }
      tempLegalguardiansData.push(legalguardianData);
    }

    setStudentsData(tempStudentsData);
    setSchoolsData(tempSchoolsData);
    setLegalguardiansData(tempLegalguardiansData);
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};


export default studentsDataComponent;






