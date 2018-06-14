import React from 'react';
import { connect } from 'react-redux';
import { db, firebase } from '../firebase'
import '../../node_modules/react-vis/dist/style.css';
import { DiscreteColorLegend, XYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import { getGames } from '../state/actions/games';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const matchDays  = ['1','2','3','Round of 16','Quarter Finals', 'Semi Finals', 'Bronze Match', 'Finals'];
const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            userDataSetArray: [],
            usersNames: [],
            lineMarkers: [],
            currentUser: {},
            users: {},
            bets: {},
            classes: props,
        }
        this.createDataSet = this.createDataSet.bind(this);
        this.calculatePoints = this.calculatePoints.bind(this);
        
    };
    
    createDataSet(user){
        var test = this.calculatePoints(user.id);      
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

        const realMatches = this.props.games.filter(match => match.status === 'FINISHED');

        

        if(tempBets!=null || tempBets != undefined){            
            Object.keys(tempBets).forEach((key) =>{
                tempBetsArray.push({...tempBets[key], id: key});
            });
            matchDaysMap.forEach(matchdayObj =>{
                let matchDayBets = tempBetsArray.filter(match => match.matchday == matchdayObj.matchday);
                let matchDayTotalPoints=0;
                if(matchDayBets.length !== 0){
                    matchDayBets.forEach(betMatch=>{
                        let realMatchWithResult = realMatches.filter(realMatch => `_${realMatch.id}` === betMatch.id)[0];
                        if(realMatchWithResult != undefined){
                            if(realMatchWithResult.result.goalsHomeTeam == betMatch.teamAResult && realMatchWithResult.result.goalsAwayTeam == betMatch.teamBResult){
                                matchDayTotalPoints = matchDayTotalPoints +2;   
                            }
                            else if(((realMatchWithResult.result.goalsHomeTeam-realMatchWithResult.result.goalsAwayTeam)>0 && (betMatch.teamAResult-betMatch.teamBResult)>0) ||
                                     ((realMatchWithResult.result.goalsHomeTeam-realMatchWithResult.result.goalsAwayTeam)<0 && (betMatch.teamAResult-betMatch.teamBResult)<0) ||
                                     ((realMatchWithResult.result.goalsHomeTeam-realMatchWithResult.result.goalsAwayTeam)===0 && (betMatch.teamAResult-betMatch.teamBResult)===0)){
                                        matchDayTotalPoints = matchDayTotalPoints +1;
                            }
                        }
                    });
                }
                if(matchDayTotalPoints!==0){
                    matchdayObj.points = totalPoints + matchDayTotalPoints;
                    totalPoints = totalPoints + matchDayTotalPoints;
                }else{
                    matchdayObj.points = totalPoints;
                }                   
            });
        }
        
        return matchDaysMap;
    }
    async componentDidMount(){      
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
        this.setState({lineMarkers: this.state.userDataSetArray.map((user, index) => <LineMarkSeries key={user.username} data={user.points} color={colorArray[index]}/>)}); 
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
            <div className="container">
                <div className="marginDiv" />
                <XYPlot height={600} width={800} xType={'ordinal'} >                    
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Matchday" />  
                    <YAxis title="Points" />
                    { this.state.lineMarkers }
                </XYPlot>
                <DiscreteColorLegend orientation="horizontal" width={1200} items={this.state.usersNames}  colors={colorArray}/>                 
                    
                <Paper className={this.state.classes.root}>
                <Table className={this.state.classes.table}>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>Current Points</CustomTableCell>
                        <CustomTableCell numeric>Matchday 1</CustomTableCell>
                        <CustomTableCell numeric>Matchday 2</CustomTableCell>
                        <CustomTableCell numeric>Matchday 3</CustomTableCell>
                        <CustomTableCell numeric>Round of 16</CustomTableCell>
                        <CustomTableCell numeric>Quarter-Finals</CustomTableCell>
                        <CustomTableCell numeric>Semi-Finals</CustomTableCell>
                        <CustomTableCell numeric>Bronze Match</CustomTableCell>
                        <CustomTableCell numeric>Final</CustomTableCell>
                        <CustomTableCell numeric>Total</CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.userDataSetArray.map(n => {
                        return (
                        <TableRow className={this.state.classes.row} key={n.username}>
                            <CustomTableCell component="th" scope="row">
                            {n.username}
                            </CustomTableCell>
                            <CustomTableCell numeric>{n.points[0].y}</CustomTableCell>
                            <CustomTableCell numeric>{n.points[1].y-n.points[0].y}</CustomTableCell>
                            <CustomTableCell numeric>{n.points[2].y-n.points[1].y}</CustomTableCell>
                            <CustomTableCell numeric>{n.points[3].y-n.points[2].y}</CustomTableCell>
                            <CustomTableCell numeric>{n.points[4].y-n.points[3].y}</CustomTableCell>
                            <CustomTableCell numeric>{n.points[5].y-n.points[4].y}</CustomTableCell>
                            <CustomTableCell numeric>{n.points[6].y-n.points[5].y}</CustomTableCell>
                            <CustomTableCell numeric>{n.points[7].y-n.points[6].y}</CustomTableCell>
                            <CustomTableCell numeric>{n.points[7].y}</CustomTableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </Paper>
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
const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Stats);