import React from 'react';
import { connect } from 'react-redux';
import { db, firebase } from '../firebase'
import '../../node_modules/react-vis/dist/style.css';
import { DiscreteColorLegend, XYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

import { getGames } from '../state/actions/games';

const matchDays  = ['1','2','3','Round of 16','Quarter Finals', 'Semi Finals', 'Bronze Match', 'Finals'];
const examplePoints = [0,2,3,4,5,6,4,5];
const fakeMatches =  [
    {id: '_165069', matchday:  1, teamAResult: 1, teamBResult: 0},
    {id: '_165072', matchday: 1, teamAResult: 2, teamBResult: 2},
    {id: '_165073', matchday: 1, teamAResult: 2, teamBResult: 4},
    {id: '_165076', matchday: 1, teamAResult: 3, teamBResult: 2},
    {id: '_165092', matchday: 2, teamAResult: 4, teamBResult: 2}    
]
class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            userDataSetArray: [],
            usersNames: [],
            lineMarkers: [],
            currentUser: {},

        }
        this.createDataSet = this.createDataSet.bind(this);
        this.calculatePoints = this.calculatePoints.bind(this);
        
    };
    
    createDataSet(user){
        var test = this.calculatePoints(user.id);  
        console.log(test);      
        let userDataSet = {};
        let dataPoints = [
            { x: matchDays[0], y: test[0].points },
            { x: matchDays[1], y: test[1].points },
            { x: matchDays[2], y: test[2].points },
            { x: matchDays[3], y: test[3].points },
            { x: matchDays[4], y: test[4].points },
            { x: matchDays[5], y: test[5].points },
            { x: matchDays[6], y: test[6].points },
            { x: matchDays[7], y: test[7].points }
        ];
        userDataSet.username= user.username;
        userDataSet.points = dataPoints;
        this.state.userDataSetArray.push(userDataSet)
    }
    calculatePoints(userId){
        let matchDaysMap = [
            {matchday:1, points: 0},
            {matchday:2, points: 0},
            {matchday:3, points: 0},
            {matchday:4, points: 0},
            {matchday:5, points: 0},
            {matchday:6, points: 0},
            {matchday:7, points: 0},
            {matchday:8, points: 0}];
        const tempBets = this.state.bets[userId];
        const tempBetsArray = [];
        let totalPoints = 0;
        if(tempBets!=null || tempBets != undefined){            
            Object.keys(tempBets).forEach((key) =>{
                tempBetsArray.push({...tempBets[key], id: key});
            });
            matchDaysMap.forEach(matchdayObj =>{
                let matchDayBets = tempBetsArray.filter(match => match.matchday == matchdayObj.matchday);
                let matchDayTotalPoints=0;
                if(matchDayBets.length !== 0){
                    matchDayBets.forEach(betMatch=>{
                        let realMatchWithResult = fakeMatches.filter(realMatch=> realMatch.id ===betMatch.id)[0];
                        if(realMatchWithResult!=undefined){
                            if(realMatchWithResult.teamAResult == betMatch.teamAResult && realMatchWithResult.teamBResult == betMatch.teamBResult){
                                matchDayTotalPoints = matchDayTotalPoints +2;   
                            }
                            else if(((realMatchWithResult.teamAResult-realMatchWithResult.teamBResult)>0 && (betMatch.teamAResult-betMatch.teamBResult)>0) ||
                                     ((realMatchWithResult.teamAResult-realMatchWithResult.teamBResult)<0 && (betMatch.teamAResult-betMatch.teamBResult)<0) ||
                                     ((realMatchWithResult.teamAResult-realMatchWithResult.teamBResult)===0 && (betMatch.teamAResult-betMatch.teamBResult)===0)){
                                        matchDayTotalPoints = matchDayTotalPoints +1;
                            }
                        }
                    });
                }
                if(matchDayTotalPoints!==0){
                    matchdayObj.points = totalPoints + matchDayTotalPoints;
                    totalPoints = totalPoints + matchDayTotalPoints;
                    console.log(totalPoints);
                }else{
                    matchdayObj.points = totalPoints;
                }                   
            });
        }
        
        return matchDaysMap;
    }
    async componentWillMount(){      

        this.setState({
            users: {},
            bets: {},           
        });

        this.props.getGames();
        
        const usersSnapshot = await db.onceGetUsers();        
        this.setState(() => ({ users: usersSnapshot.val() }));
        const betsSnapshot = await db.doGetBets();
        this.setState(() => ({ bets: betsSnapshot.val() }));
        Object.keys(this.state.users).forEach((key) =>{
            this.state.userArray.push({...this.state.users[key], id: key});
        });
        this.state.userArray.forEach((user)=>{
            this.createDataSet(user);
        });
        this.setState({lineMarkers: this.state.userDataSetArray.map(user => <LineMarkSeries key={user.username} data={user.points} />)}); 
        this.setState({usersNames: this.state.userDataSetArray.map(user => user.username)});         
        
        await firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ currentUser: authUser }))
                : this.setState(() => ({ currentUser: null }));
        });
        // this.setState({bets: this.state.bets[this.state.userId]});

        
    };

    
    render() {
        return (
            <div>
                <XYPlot height={600} width={800} xType={'ordinal'}>
                    
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Matchday" />  
                    <YAxis title="Points" />
                    { this.state.lineMarkers }
                </XYPlot>
                <DiscreteColorLegend width={180} items={this.state.usersNames} /> 
            </div>
        );
    }
}

const mapStateToProps = state => ({
    games: state.games.games,
});

const mapDispatchToProps = dispatch => ({
    getGames: () => dispatch(getGames()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Stats);