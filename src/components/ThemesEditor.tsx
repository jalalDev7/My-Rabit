import React from 'react'

const ThemesEditor = (props: {user: string, userTheme: string}) => {
  return (<>
    <div>
        {props.user}
        {props.userTheme}
    </div>
    <div>
    
    {props.userTheme}
    </div>
    </>
  )
}

export default ThemesEditor