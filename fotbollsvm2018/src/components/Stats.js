import React from 'react';
import { db } from '../firebase'
import '../../node_modules/react-vis/dist/style.css';
import { DiscreteColorLegend, XYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const matchDays  = ['1','2','3','Round of 16','Quarter Finals', 'Semi Finals', 'Bronze Match', 'Finals'];
const examplePoints = [0,2,3,4,5,6,4,5];
class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            userDataSetArray: [],
            usersNames: [],
            lineMarkers: []

        }
        this.createDataSet = this.createDataSet.bind(this);
        
    };
    
    createDataSet(user){
        let userDataSet = {};
        let dataPoints = [
            { x: matchDays[0], y: examplePoints[0] },
            { x: matchDays[1], y: examplePoints[1] },
            { x: matchDays[2], y: examplePoints[2] },
            { x: matchDays[3], y: examplePoints[3] },
            { x: matchDays[4], y: examplePoints[4] },
            { x: matchDays[5], y: examplePoints[5] },
            { x: matchDays[6], y: examplePoints[6] },
            { x: matchDays[7], y: examplePoints[7] }
        ];
        userDataSet.username= user.username;
        userDataSet.points = dataPoints;
        this.state.userDataSetArray.push(userDataSet)
    }

    async componentWillMount(){      

        this.setState({
            users: {}
        });
        const snapshot = await db.onceGetUsers();        
        
        this.setState(() => ({ users: snapshot.val() }));
        Object.keys(this.state.users).forEach((key) =>{
            this.state.userArray.push(this.state.users[key]);
        });
        this.state.userArray.forEach((user)=>{
            this.createDataSet(user);
        });
        this.setState({lineMarkers: this.state.userDataSetArray.map(user => <LineMarkSeries key={user.username} data={user.points} />)}); 
        this.setState({usersNames: this.state.userDataSetArray.map(user => user.username)});         
    };
    
    render() {
        return (
            <div>
                <XYPlot height={600} width={800} xType={'ordinal'}>
                    
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Matches" />  
                    <YAxis title="Points" />
                    { this.state.lineMarkers }
                </XYPlot>
                <DiscreteColorLegend width={180} items={this.state.usersNames} /> 
            </div>
        );
    }
}

export default Stats;