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

class Start extends Component {
  static propTypes = {
    getInformation: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  state = {
    cellphone: '',
  };

  validation = () => {
    const { input } = this.input;
    if (input.isValid()) {
      const rawValue = input.getRawValue();
      this.props.getInformation(`+55${rawValue}`);
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
        <Button title="Entrar" onPress={this.validation} loading={this.props.loading} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  getInformation: cellphone => dispatch(UserActions.userGetInformation(cellphone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
