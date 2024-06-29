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

export const questionnairePageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

export const elementsDiff = {
    marginY: '2vh'
}


export const selectBoxStyle = {
    width:'90vw'
}

export const signInPaperStyle = {

    height : '70vh',
    width : '60vw',
    margin: '10vh auto'
   
}

const singInColor = '#009999';
export const signInIconStyle = {

    marginTop: '10%',
    backgroundColor: singInColor
}

export const signInButtonStyle = {
    
    width: '80%',
    marginTop: '5%',
    backgroundColor: singInColor

}