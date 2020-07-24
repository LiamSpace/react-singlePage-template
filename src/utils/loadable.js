import React from 'react'
import Loadable from 'react-loadable'

const loadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div>.....loading....</div>
    }
    else if (error) {
        return <div>sorry,there was a problem loading the page.</div>
    }
    else {
        return null;
    }
}

export default (loader, loading = loadingComponent) => {
    return (
        Loadable({
            loader,
            loading
        })
    )
}