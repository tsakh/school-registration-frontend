import * as React from 'react';
import MockData from './MockData.json'



export default function SourceList({ onSourceChanged }){
    React.useEffect(() => {
        //send a request to backend and get the source list
        onSourceChanged(MockData.sourceOfInformation);
    }, [onSourceChanged]);
  
    return null;
 }