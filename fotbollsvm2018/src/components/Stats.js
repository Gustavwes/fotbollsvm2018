import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { DiscreteColorLegend, XYPlot, LineMarkSeries, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const matchDays  = ['1','2','3','Round of 16','Quarter Finals', 'Semi Finals', 'Bronze Match', 'Finals']
class Stats extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount(){
        console.log(matchDays);
        const data = [
            { x: matchDays[0], y: 0 },
            { x: matchDays[1], y: 1 },
            { x: matchDays[2], y: 2 },
            { x: matchDays[3], y: 3 },
            { x: matchDays[4], y: 5 },
            { x: matchDays[5], y: 5 },
            { x: matchDays[6], y: 6 },
            { x: matchDays[7], y: 8 }
        ];

        const data2 = [
            { x: matchDays[0], y: 0 },
            { x: matchDays[1], y: 0 },
            { x: matchDays[2], y: 4 },
            { x: matchDays[3], y: 7 },
            { x: matchDays[4], y: 9 },
            { x: matchDays[5], y: 12 },
            { x: matchDays[6], y: 15 },
            { x: matchDays[7], y: 30 }
        ];

        this.setState({
            users: [{ name: 'Gustav', points: data },
                     {name: 'Gurra', points: data2}]
        });
    };

    render() {
        const lineMarkers = this.state.users.map(user => <LineMarkSeries key={user.name} data={user.points} />);
        const users = this.state.users.map(user => user.name);
        return (
            <div>
                <XYPlot height={600} width={800} xType={'ordinal'}>
                    
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Matches" />  
                    <YAxis title="Points" />
                    { lineMarkers }
                </XYPlot>
                <DiscreteColorLegend width={180} items={users} /> 
            </div>
        );
    }
}

export default Stats;