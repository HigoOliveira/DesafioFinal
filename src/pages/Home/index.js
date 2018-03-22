/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import UserActions from 'store/ducks/user';

/* Presentational */
import { View } from 'react-native';
import Alert from 'components/Alert';
import Button from 'components/Button';
import Input from 'components/Input';

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
      const { input } = this.input;
      this.props.getInformation(input.getRawValue());
    } else {
      Alert.alert('Você precisa passar um número válido.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          onChangeText={(cellphone) => { this.setState({ cellphone }); }}
          value={this.state.cellphone}
          type="cel-phone"
          icon="phone"
          placeholder="Seu número de telefone"
          ref={(ref) => { this.input = ref; }}
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
