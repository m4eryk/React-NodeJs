import React, { Component } from 'react'
import SingleWork from '../Elements/Work/SingleWork';
import JobSelect from '../Elements/Work/JobSelect';
import AddWork from '../Elements/Work/AddWork';
import {connect} from 'react-redux';
import axios from 'axios';
import ProgressBar from '../Elements/Publick/ProgressBar';

class WorkList extends Component {
    state = {
        workList: '',
        load: false,
        category: '',
        jobType: '',
        sortBy: ''
    }

    componentWillMount(){
        this.getWorkList();
        window.scroll(0,0);
    }

    getWorkList = () => {
        axios.get('/api/work')
            .then(work => this.setState({
                workList: work.data,
                load: true
            }))
    }

    workSearch = (category1, jobType1, sortBy1) => {
        // this.setState({
        //     load: false,
        //     category: category1,
        //     jobType: jobType,
        //     sortBy: sortBy
        // })

        const search = {
            category: category1,
            jobType: jobType1,
            sortBy: sortBy1
        }

        console.log(this.state)
        axios.post('/api/work/search', search)
            .then(work => {
                console.log(work.data)
                this.setState({
                    workList: work.data.work,
                    category: work.data.find.category,
                    jobType: work.data.find.jobType,
                    sortBy: work.data.find.sortBy,
                    load: true
                })
            })
    }

  render() {
    //console.log(this.state)
    return (
        <React.Fragment>
            {
            this.state.load
            ?
                <div style={{marginTop: 70}} className='container md-container '>
                    <div className='d-flex justify-content-between mb-4'>
                        <h3>Work</h3>
                        {
                            this.props.auth.isAuthenicated
                            ?
                                <AddWork auth={this.props.auth}/>
                            :
                                null
                        }
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-3'>
                            <JobSelect workSearch={this.workSearch}/>
                        </div>

                        <div className='col-12 col-lg-9'>
                            {this.state.workList.map((vul, key) => {
                                return (<SingleWork work={vul} key={key} />)
                            })}
                        </div>
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

export default connect(mapStateToProps)(WorkList)