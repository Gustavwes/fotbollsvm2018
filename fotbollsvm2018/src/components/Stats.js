import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { DiscreteColorLegend, XYPlot, LineMarkSeries, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

class Stats extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount(){

        const data = [
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 5 },
            { x: 5, y: 5 },
            { x: 6, y: 6 },
            { x: 7, y: 8 },
            { x: 8, y: 10 },
            { x: 9, y: 11 }
        ];

        const data2 = [
            { x: 0, y: 1 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: 4 },
            { x: 4, y: 4 },
            { x: 5, y: 4 },
            { x: 6, y: 4 },
            { x: 7, y: 4 },
            { x: 8, y: 4 },
            { x: 9, y: 4 }
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
                <XYPlot height={600} width={800}>
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