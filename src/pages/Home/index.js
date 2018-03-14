/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import UserActions from 'store/ducks/user';

/* Presentational */
import { View, Button, TextInput } from 'react-native';


// import styles from './styles';
class Home extends Component {
  static propTypes = {
    getInformation: PropTypes.func.isRequired,
  };

  state = {
    cellphone: '',
  };

  validation = () => {
    const { cellphone } = this.state;
    if (cellphone) {
      this.props.getInformation();
    }
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(cellphone) => { this.setState({ cellphone }); }}
          value={this.state.cellphone}
        />
        <Button title="Entrar" onPress={this.validation} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getInformation: () => dispatch(UserActions.userGetInformation()),
});

export default connect(null, mapDispatchToProps)(Home);
