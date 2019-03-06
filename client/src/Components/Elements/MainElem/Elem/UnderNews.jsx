import React from 'react';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import UnderElem from './UnderElem';


function WithWidth(props) {
  const { width } = props;
  console.log(props)
    if(props.news === true){
        return <UnderElem arrNews={props.arrNews}/>
    } else {
        if(width === 'xs'){
            return  <UnderElem key='2a' arrNews={newsSlice(props.news, 3)}/>
        }else if(width === 'sm'){
            return <UnderElem key='3a' arrNews={newsSlice(props.news, 4)}/> 
        }else if(width === 'md'){
            return <UnderElem  key='4a' arrNews={newsSlice(props.news, 3)}/>
        } else if(width === 'lg'){
            return <UnderElem key='5a' arrNews={newsSlice(props.news, 4)}/>
        } else {
            return <UnderElem key='6a' arrNews={newsSlice(props.news, 5)}/>
        }
    }
}

function newsSlice(newsList, count){
    const news = [];
    news.music = newsList.music.slice(0, count);
    news.art = newsList.art.slice(0, count);
    news.film = newsList.film.slice(0, count);
    return news
}


WithWidth.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(WithWidth);