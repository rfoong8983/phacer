import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Timer from './timer';
import {fetchUserTimers, recordTimer, fetchTimers} from '../../actions/timer_actions';
import { withCookies } from 'react-cookie';


const msp = (state, ownProps) => {
    return({
        end: ownProps.end,
        users: state.users,
        currentUser: state.session.user
    });
}

const mdp = (dispatch) => {
    return ({
        fetchTimers: () => dispatch(fetchTimers()),
        fetchUserTimers: (id) => dispatch(fetchUserTimers(id)),
        recordTimer: (data, id, optl) => dispatch(recordTimer(data, id, optl)),
    })
}



export default withCookies(withRouter(connect(msp, mdp)(Timer)));