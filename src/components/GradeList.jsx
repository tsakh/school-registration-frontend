import * as React from 'react';
import MockData from '../MockData.json'


export default function GradeList({ onGradeListChanged }){
    React.useEffect(() => {
        //send a request to backend and get the source list
        onGradeListChanged(MockData.gradeList);
    }, [onGradeListChanged]);
  
    return null;
 }