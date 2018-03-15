/* Core */
import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/user';

/* Presentational */
import { View, Button, TextInput } from 'react-native';
import Alert from 'components/Alert';


// import styles from './styles';

class SignIn extends Component {
  state = {
    cellphone: '',
    password: '',
  }

  validation = () => {
    const { cellphone, password } = this.state;
    if (cellphone && password) {
      this.props.signIn();
    } else {
      Alert.alert('Por favor entre com dados válidos para poder registrar.');
    }
  }

  render() {
    return (
      <View>
        <TextInput
          value={this.props.cellphone}
        />
        <TextInput
          onChangeText={(password) => { this.setState({ password }); }}
          secureTextEntry
          value={this.state.password}
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
