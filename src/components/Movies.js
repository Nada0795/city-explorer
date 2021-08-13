import React from 'react';


class Movies extends React.Component{


    render(){

        return(

            <>
            {
                this.props.moviesArr.map(item=>{
                    <h1>
                     {item.title}
                    </h1>
                    
                     {item.vote_average}
                     {item.vote_count}
                     {item.overview} 
                     {item.popularity}
                     {item.release_date}
                   
                })
            }
            </>
        )
    }
}

export default Movies;