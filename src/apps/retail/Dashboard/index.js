import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import {getDevices} from '../../../redux/actions/retail';
import {

  Card,
  CardBody,
  Col,
  Input,
  Row
} from 'reactstrap';

import 'react-dates/initialize';


import MapWidget from "../../../components/MapWidget";

import {UPDATE_DATERANGE} from '../../../redux/actions/retail'


class Dashboard extends Component {

  constructor(props) {
    super(props);
    
    this.selectedVFStore = null;

    this.state = {
      specificDate: "0",
      startDate: null,
      endDate: null,
      
      stores: [],
      selectedStores: [],
            
      
    }
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  componentWillMount() {
    let stores = [{
      Address:"point A",
      color:"#eb3b5a",
      Country:"Schweiz",
      Latitude:47.376591,
      LocationID:"01",
      Longitude:8.53997,
      
      PostCode:8001,
      Store:"store A"
    },
    {
      Address:"point B",
      color:"#eb3b5a",
      Country:"Schweiz",
      Latitude:44.376591,
      LocationID:"01",
      Longitude:8.53997,
      
      PostCode:8001,
      Store:"store B"
    },
  ]
    
      this.setState({stores});
    
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    
      
    
  }

  
    
    
  render() {    

    
    
    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col xs="12" md="4">
            <Card>
              <CardBody style={{height: '400px'}}>
                <MapWidget
                  positions={this.state.stores}/>
              </CardBody>
            </Card>
          </Col>
          
        </Row>

        
      </div>
    );
  }
  
}

const mapStateToProps = state => ({
  user: state.auth.user,
  devices: state.retail.devices,
  startTS: state.retail.startDate ? state.retail.startDate.tz('Europe/Berlin').startOf('day').unix() * 1000 : null,
  endTS: state.retail.endDate ? state.retail.endDate.tz('Europe/Berlin').endOf('day').unix() * 1000 : null,
  startDate: state.retail.startDate,
  endDate: state.retail.endDate,
});

const mapDispatchToProps = {
  getDevices,
  updateDateRange: (startDate, endDate) => {
    return {
      type: UPDATE_DATERANGE,
      payload: {
        startDate,
        endDate
      }
    };
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

