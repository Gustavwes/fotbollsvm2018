import React from 'react';
import { db, firebase } from '../firebase';
import { Form, Field, reduxForm } from 'redux-form';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import { getBets } from '../state/actions/bets';


class GameStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamesDB: db.doGetAllGames(),
            games: null,
            userId: null

        }
    }

    componentDidMount() {
        db.doGetAllGamesTest().then(snapshot =>
            this.setState(() => ({ games: snapshot.val() }))
        );
        var userId = firebase.auth.currentUser.uid;

        

        this.setState({ userId });

    }


    render() {
        const { games } = this.state;

        return (
            <div>                
                {!!games && <GamesListForm games={games} userid={this.state.userId} {...this.props} />}
            </div>
        );
    }
}

let MatchDayCount = 0;

const INITIAL_STATE = {
    teamAResult: '',
    teamBResult: '',
    userId: '',
    gameId: '',
    error: null,
};

class PrintMatchday extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);      
       
    }
    handleAddOne(){
        MatchDayCount = MatchDayCount+1;
    };
    
    componentWillMount(){
        this.handleAddOne();
    }
    render() {
       
        if(MatchDayCount ===1 || MatchDayCount===17 || MatchDayCount === 33){
            return(
                <div><p>Matchday {MatchDayCount%15}</p></div>
    
            )
        }
        return null;
    }
}

class GamesListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.submitBet = this.submitBet.bind(this);
        
    }
    submitBet = (values) => {
        const userId = this.props.userid;       
        
        db.doCreateBet(userId, values);
        
    }
   
  
    render() {
        const { handleSubmit } = this.props;        
        return (
            <div>  
                <Form onSubmit={handleSubmit(this.submitBet)}>
                {Object.keys(this.props.games).map(key =>
                    <div key={key}>
                         <PrintMatchday />
                       
                            <label>{this.props.games[key].teamA}</label>
                            <Field
                                name={`${key}.teamAResult`}
                                component={({input, ...props}) => <TextField type="number" {...input} {...props}/>}
                                >
                            </Field>
                                <label>vs</label>
                            <Field
                                name={`${key}.teamBResult`}
                                component={({input, ...props}) => <TextField type="number" {...input} {...props}/>}
                            >
                            </Field>
                            <label>{this.props.games[key].teamB}</label>
                            <button type="submit">Submit</button>
                        
                    </div>
                )}
                </Form>
            </div>
        )
       
    }

}


class GameStatsPage extends React.Component {
    componentWillMount() {
        this.props.getBets().then(() => console.log(this.props.initialValues));
    }

    render() { return (
        <div>
            <h1>Game Stats</h1>
            <GameStats {...this.props} />
        </div>
    )}
};

GameStatsPage = reduxForm({form: 'gamesListForm', enableReinitialize: true })(GameStatsPage);

const mapStateToProps = state => ({
    initialValues: state.bets.bets,
});

const mapDispatchToProps = dispatch => ({
    getBets: () => dispatch(getBets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStatsPage);
