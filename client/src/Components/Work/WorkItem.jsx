import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';
import axios from 'axios';
import ProgressBar from '../Elements/Publick/ProgressBar';
import DeliteDialog from '../Elements/Publick/DeliteDialog';
import AddWork from '../Elements/Work/AddWork';
import {Link} from 'react-router-dom';

class WorkItem extends Component {
    state = {
        avatar: '',
        userId: '',
        name: '',
        open: false,
        title: '',
        task: '',
        requirements: '',
        category: '',
        jobType: '',
        currency: '',
        cost: '',
        date: '',
        updateDate:'',
        paymentOptions: [],
        load: false
    }

    componentWillMount(){
        this.getWork()
    }

    getWork = () => {
        this.setState({load: false})
        axios.get(`/api/work/item/${this.props.match.params.work_id}`)
            .then(work => {
                this.setState({
                    updateDate: work.data.updateDate,
                    avatar: work.data.user.avatar,
                    userId: work.data.user._id,
                    name: work.data.user.name,
                    title: work.data.title,
                    task: work.data.task,
                    requirements: work.data.requirements,
                    category: work.data.category,
                    jobType: work.data.jobType,
                    currency: work.data.currency,
                    cost: work.data.cost,
                    paymentOptions: work.data.paymentOptions,
                    date: work.data.date,
                    load: true
                })
            })
    }

  render() {
      console.log(this.state)
    return (
        <React.Fragment>
            {
                this.state.load
                ?
                    <div className='container rounded shadow' style={{height: '100%', backgroundColor: 'white' ,marginTop: 60, fontFamily: 'Roboto, Helvetica, Arial, sans-serif'}}>

                        <div className='row d-flex justify-content-between p-2 pt-4 pb-4 align-items-start'>
                            <div className='col-md-12 col-lg-7 col-xl-7'>
                                <h3>{this.state.title}</h3>
                                <p>Категория: {this.state.category}</p>
                                <h4>Задача</h4>
                                <p className='text-justify' style={{textIndent: 30}}>{this.state.task}</p>
                                <h4>Обязательные требования</h4>
                                <p>{this.state.requirements}</p>
                            </div>
                            
                            <div className='col-sm-12 col-md-12 col-lg-4 col-xl-4 shadow rounded p-3 mr-sm-2 '>
                                <div className='p-2 border-bottom'><p>Информация по проекту</p></div>
                                <div className='d-flex justify-content-between p-2 border-bottom mt-1'><span style={{color: '#888'}}>Стоимость:</span> <span>{this.state.cost} {this.state.currency}</span></div>
                                <div className='d-flex justify-content-between p-2 border-bottom mt-1'><span style={{color: '#888'}}>Срок выполнения:</span> <span>3 дня</span></div>
                                <div className='d-flex justify-content-between p-2 border-bottom mt-1'>
                                    <div><span style={{color: '#888'}}>Варианты оплаты:</span></div>
                                        <div className='d-flex flex-column text-right'>
                                            {this.state.paymentOptions.map((vul, key) => {
                                                return <span key={key}>{vul}</span>
                                            })}
                                        </div>
                                </div>
                                <div className='d-flex justify-content-between p-2 border-bottom mt-1'><span style={{color: '#888'}}>Дата публикации:</span> <span>{this.state.date.slice(0,10)} {this.state.date.slice(12,16)}</span></div>
                                    {
                                        this.state.updateDate !== '' && this.state.updateDate !== undefined
                                        ?
                                            <div className='d-flex justify-content-between p-2 border-bottom mt-1'><span style={{color: '#888'}}>Обновлено:</span> <span>{this.state.updateDate.slice(0,10)} {this.state.updateDate.slice(12,16)}</span></div>
                                        :
                                            null
                                    }
                                <div className='d-flex justify-content-between p-2 mt-1'><span style={{color: '#888'}}>Был на сайте:</span> <span>2019-02-05 21:12</span></div>
                            </div>
                        </div>

                        <div className='p-3 border-top d-flex justify-content-sm-between flex-wrap justify-content-center'>
                            <div className='d-flex flex-column ml-1 mr-1'>
                                <Link to={`/profile/user/${this.state.userId}`}>
                                    <div className='d-flex align-items-center shadow-sm rounded p-2 btn btn-primary justify-content-center'>
                                        <Avatar className='mr-2' src={this.state.avatar}/>
                                        <span>{this.state.name}</span>
                                    </div>
                                </Link>
                                <p className='mt-3 mb-0 text-center mb-2 mb-sm-0'>
                                    Оставлено заявок: 100 
                                </p>
                            </div>
                            
                            {
                                this.props.auth.isAuthenicated
                                ?
                                    <div className='ml-1 mr-1 d-flex flex-column '>
                                    {
                                        this.props.auth.user.id === this.state.userId
                                        ?
                                            <>
                                                <AddWork getWork={this.getWork} dop={this.props} reduct={true} work={this.state}/>
                                                <DeliteDialog work={this.props}/>
                                            </>
                                        :
                                            <>
                                                <Button className='mb-2' variant="outlined" color="primary">
                                                    Откликнуться
                                                </Button>
                                                <Button variant="outlined" color="secondary">
                                                    Пожаловаться
                                                </Button>
                                            </>
                                    }
                                    </div>
                                :
                                    null
                            }
                        </div>
                    </div>
                :
                    <div style={{height: '95vh'}} className='d-flex justify-content-center'>
                        <ProgressBar />
                    </div>
            }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(WorkItem)