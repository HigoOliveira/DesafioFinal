/* Core */
import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/user';

/* Presentational */
import { View } from 'react-native';
import Alert from 'components/Alert';
import Input from 'components/Input';
import Button from 'components/Button';

import styles from './styles';

class SignIn extends Component {
  state = {
    password: '',
  }

  validation = () => {
    const { password } = this.state;
    const { cellphone } = this.props;
    if (cellphone && password) {
      this.props.signIn();
    } else {
      Alert.alert('Por favor entre com dados válidos para poder acessar.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.props.cellphone}
          type="cel-phone"
          icon="phone"
          placeholder="Seu número de telefone"
          ref={(ref) => { this.input = ref; }}
          editable={false}
        />
        <Input
          onChangeText={(password) => { this.setState({ password }); }}
          value={this.state.password}
          type="none"
          icon="lock"
          placeholder="Sua senha secreta"
          secureTextEntry
          ref={(ref) => { this.input = ref; }}
        />
        <Button title="Entrar" onPress={this.validation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cellphone: state.user.cellphone,
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(ActionCreators.userSignIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
