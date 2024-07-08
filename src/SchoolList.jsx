import * as React from 'react';
import MockData from './MockData.json'



export default function SchoolDataExtractor({ onDataExtracted }){
    React.useEffect(() => {
        //send a request to backend and get the school list
        onDataExtracted(MockData.schools);
    }, [onDataExtracted]);
  
    return null;
 }