import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';

export default function SingleWork(props) {
  return (
    <div className='shadow rounded pr-3 pl-3 pt-3 pb-0 mb-4' style={{fontFamily: 'Roboto, Helvetica, Arial, sans-serif', border: '1px solid #4d809f'}}>
        <div className='d-flex justify-content-between row'>
            <Link to={`/work/${props.work._id}`} className='col-lg-10'><h3>{props.work.title}</h3></Link>
            <h4 className='col-lg-2'>{props.work.cost} {props.work.currency}</h4>
        </div>

        <div className='row mt-3'>
            <p style={{textIndent: 30, textAlign: 'justify'}} className='col-12'>{props.work.task.slice(0, 170)}...</p>
        </div>

        <div className='p-3 border-top flex-wrap d-flex justify-content-sm-between justify-content-center'>
            <div className='d-flex flex-column flex-lg-row'>
                <p className='mt-3 mb-0 text-center mb-2 mb-sm-0 mr-md-4'>Оставлено заявок: 100</p>
                <p className='mt-3 mb-0 text-center mb-2 mb-sm-0'>Дата публикации: {props.work.date.slice(0,10)}</p>
            </div>

            <div style={{minWidth: 150}} className='d-flex flex-column ml-1 mr-1'>
                <Link to={`/profile/user/${props.work.user._id}`}>
                    <div className='d-flex align-items-center shadow-sm rounded p-2 btn btn-primary justify-content-center'>
                        <Avatar className='mr-2' src={props.work.user.avatar}/>
                        <span>{props.work.user.name}</span>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}
