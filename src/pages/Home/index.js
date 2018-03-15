/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import UserActions from 'store/ducks/user';

/* Presentational */
import { View, Button, TextInput } from 'react-native';
import Alert from 'components/Alert';

import styles from './styles';

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
      this.props.getInformation(cellphone);
    } else {
      Alert.alert('Você precisa passar um número válido.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
  getInformation: cellphone => dispatch(UserActions.userGetInformation(cellphone)),
});

export default connect(null, mapDispatchToProps)(Home);
