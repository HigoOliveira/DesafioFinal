/* Core */
import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/user';

/* Presentational */
import { View, Button, TextInput } from 'react-native';
import Alert from 'components/Alert';


// import styles from './styles';

class SignUp extends Component {

  state = {
    cellphone: '',
    fullname: '',
    password: '',
  }

  validation = () => {
    const { cellphone, fullname, password } = this.state;
    if (cellphone && fullname && password) {
      this.props.signUp();
    } else {
      Alert.alert('Por favor entre com dados válidos para poder registrar.');
    }
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(cellphone) => { this.setState({ cellphone }); }}
          value={this.state.cellphone}
        />
        <TextInput
          onChangeText={(fullname) => { this.setState({ fullname }); }}
          value={this.state.fullname}
        />
        <TextInput
          onChangeText={(password) => { this.setState({ password }); }}
          secureTextEntry
          value={this.state.password}
        />
        <Button title="Criar conta grátis" onPress={this.validation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  signUp: () => dispatch(ActionCreators.userSignUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
