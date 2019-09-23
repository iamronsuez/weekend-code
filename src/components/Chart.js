import React, { Component } from 'react';
import {Chart} from 'react-google-charts';
import moment from 'moment';


class ChartBox extends Component {

  state = {
    data: [],
    loading: true
  }

  componentDidMount() {
    const {currency} = this.props
    fetch(`https://bbh8jsiy66.execute-api.us-east-1.amazonaws.com/dev/api/snapshots?ref=${currency}&limit=100`).then((response) => response.json())
    .then((data) => {
      this.setState({
        data,
        loading: false
      })
    })
    .catch((err) => console.log(err))
  }

  _createChartData (data) {
    console.log(data)
    const results = (data || []).map(({ts, rel}) => ([moment(ts).format('hh:mm'), rel]))

    return [['time', 'price'], ...results]
  }
  render() {
    const {currency} = this.props
    const {data, loading} = this.state
    if (loading) return null
    return (
        <div className='chart'>
        <Chart
        width={'480px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this._createChartData(data)}
        options={{
          title: currency
        }}
        rootProps={{ 'data-testid': '1' }}
        />
        </div>
    );
  }
}

export default ChartBox;
