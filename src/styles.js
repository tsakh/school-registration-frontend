export const stepStyles = {
    width: '20vw',
    textAlign: 'center',
    margin: 'auto',
};

export const getColor = (isPassed) => {
    return isPassed ? '#12B413' : '#f5e256';
};

export const searchBarStyle = {
    width: '80vw'
}

export const managementPageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh', 
    width: '100%'
}

export const progressTabStyle = {
    padding: '5%',
    margin: 'auto', 
    textAlign: 'center', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    width : '40vw'
}